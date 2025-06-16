import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, roles } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// For å sjekke at variabler faktisk er der:
console.log("POSTGRES_URL:", process.env.POSTGRES_URL);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const createAdminSchema = z.object({
  name: z.string().min(1, "Navn er påkrevd"),
  email: z.string().email("Ugyldig e-postadresse"),
});

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
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Valider input med Zod
    const result = createAdminSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Valideringsfeil", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email } = result.data;

    // Finn hovedredaktør-rolle
    const hovedredaktør = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "hovedredaktør"))
      .limit(1);

    if (!hovedredaktør[0]) {
      return NextResponse.json(
        { error: "Hovedredaktør-rolle ikke funnet" },
        { status: 500 }
      );
    }

    // Opprett ny admin
    const ny = await db
      .insert(users)
      .values({
        name,
        email,
        role_id: hovedredaktør[0].id
      })
      .returning();

    return NextResponse.json(ny[0]);
  } catch (error) {
    console.error("🔥 API ERROR POST /api/admins:", error);
    return NextResponse.json(
      { error: "Kunne ikke opprette admin" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Ugyldig ID" },
        { status: 400 }
      );
    }

    // Slett admin
    await db
      .delete(users)
      .where(eq(users.id, Number(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("🔥 API ERROR DELETE /api/admins:", error);
    return NextResponse.json(
      { error: "Kunne ikke slette admin" },
      { status: 500 }
    );
  }
} 