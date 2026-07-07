import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const companyName = typeof body?.companyName === "string" ? body.companyName.trim() : "";

  if (!name || !email || !password || !companyName) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { name, email, passwordHash },
    });
    const company = await tx.company.create({
      data: { name: companyName },
    });
    await tx.membership.create({
      data: { userId: user.id, companyId: company.id, role: "ceo" },
    });
  });

  return NextResponse.json({ ok: true });
}
