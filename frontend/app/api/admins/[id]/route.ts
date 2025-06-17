import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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
    console.error("🔥 API ERROR DELETE /api/admins/[id]:", error);
    return NextResponse.json(
      { error: "Kunne ikke slette admin" },
      { status: 500 }
    );
  }
} 