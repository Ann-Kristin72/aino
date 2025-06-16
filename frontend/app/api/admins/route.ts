import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, roles } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// For å sjekke at variabler faktisk er der:
console.log("POSTGRES_URL:", process.env.POSTGRES_URL);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

export async function GET() {
  try {
    console.log("✅ API hit: /api/admins");

    // Finn hovedredaktør-rolle-ID
    const hovedredaktørRole = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "hovedredaktør"))
      .limit(1);

    if (!hovedredaktørRole[0]) {
      console.log("ℹ️ Ingen hovedredaktør-rolle funnet");
      return NextResponse.json([]);
    }

    // Hent brukere med denne rollen direkte fra users.role_id
    const redaktører = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email
      })
      .from(users)
      .where(eq(users.role_id, hovedredaktørRole[0].id));

    console.log("✅ Found admins:", redaktører);
    return NextResponse.json(Array.isArray(redaktører) ? redaktører : []);

  } catch (error) {
    console.error("🔥 API ERROR /api/admins:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Navn mangler" }, { status: 400 });

    const hovedredaktør = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "hovedredaktør"))
      .limit(1);

    if (!hovedredaktør[0]) {
      return NextResponse.json({ error: "Rolle ikke funnet" }, { status: 500 });
    }

    // Sett role_id direkte på bruker
    const ny = await db
      .insert(users)
      .values({ name, email: `${name.toLowerCase()}@example.com`, role_id: hovedredaktør[0].id })
      .returning();

    return NextResponse.json({ id: ny[0].id, name });
  } catch (error) {
    console.error("Feil i POST /api/admins:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 