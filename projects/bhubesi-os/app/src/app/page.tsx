import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import BhubesiOS from "@/components/BhubesiOS";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const membership = await db.membership.findFirst({
    where: { userId: session.user.id },
    include: { company: true },
    orderBy: { createdAt: "asc" },
  });

  if (!membership) {
    redirect("/login");
  }

  return (
    <BhubesiOS
      userName={session.user.name ?? session.user.email ?? "You"}
      companyId={membership.companyId}
      companyName={membership.company.name}
    />
  );
}
