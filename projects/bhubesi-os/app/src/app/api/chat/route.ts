import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { generateSeatReply, type GatewayMessage } from "@/lib/llmGateway";
import { getSeat } from "@/lib/seats";

async function requireMembership(userId: string, companyId: string) {
  return db.membership.findUnique({
    where: { userId_companyId: { userId, companyId } },
  });
}

// Load (or lazily create) the persisted conversation for a seat, scoped to the
// authenticated user's company — mirrors platform/api/api-architecture.md's
// tenant-scoping-by-default principle even in this minimal MVP slice.
export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const seatId = searchParams.get("seatId");
  const companyId = searchParams.get("companyId");
  if (!seatId || !companyId || !getSeat(seatId)) {
    return NextResponse.json({ error: "Invalid seatId or companyId" }, { status: 400 });
  }

  const membership = await requireMembership(session.user.id, companyId);
  if (!membership) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const conversation = await db.conversation.findUnique({
    where: { userId_companyId_seatId: { userId: session.user.id, companyId, seatId } },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  return NextResponse.json({ messages: conversation?.messages ?? [] });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const seatId = body?.seatId as string | undefined;
  const companyId = body?.companyId as string | undefined;
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!seatId || !companyId || !getSeat(seatId) || !message) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const membership = await requireMembership(session.user.id, companyId);
  if (!membership) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const conversation = await db.conversation.upsert({
    where: { userId_companyId_seatId: { userId: session.user.id, companyId, seatId } },
    update: {},
    create: { userId: session.user.id, companyId, seatId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  const history: GatewayMessage[] = conversation.messages.map((m) => ({
    role: m.role === "seat" ? "seat" : "user",
    content: m.content,
  }));

  await db.message.create({
    data: { conversationId: conversation.id, role: "user", content: message },
  });

  const { text, source } = await generateSeatReply(seatId, message, history);

  const seatMessage = await db.message.create({
    data: { conversationId: conversation.id, role: "seat", content: text },
  });

  return NextResponse.json({ message: seatMessage, source });
}
