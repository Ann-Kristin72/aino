import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, roles, userRoles } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const hovedredaktørRole = await db.select().from(roles).where(eq(roles.name, "hovedredaktør")).limit(1);
  if (!hovedredaktørRole[0]) return NextResponse.json([]);

  const redaktører = await db
    .select({ id: users.id, name: users.name })
    .from(users)
    .innerJoin(userRoles, eq(users.id, userRoles.userId))
    .where(eq(userRoles.roleId, hovedredaktørRole[0].id));

  return NextResponse.json(redaktører);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  if (!name) return new NextResponse("Navn mangler", { status: 400 });

  const hovedredaktør = await db
    .select()
    .from(roles)
    .where(eq(roles.name, "hovedredaktør"))
    .limit(1);

  if (!hovedredaktør[0]) return new NextResponse("Rolle ikke funnet", { status: 500 });

  const ny = await db.insert(users).values({ name, email: `${name.toLowerCase()}@example.com` }).returning();

  await db.insert(userRoles).values({
    userId: ny[0].id,
    roleId: hovedredaktør[0].id,
  });

  return NextResponse.json({ id: ny[0].id, name });
} 