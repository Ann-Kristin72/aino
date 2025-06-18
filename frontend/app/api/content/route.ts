import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { content } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    console.log('API /content: Fetching content from database...');
    const result = await db.select().from(content).orderBy(content.created_at);
    console.log('API /content result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /content error:', error);
    return NextResponse.json(
      { error: "Kunne ikke hente innhold. Vennligst prøv igjen senere." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, content_md } = body;

    if (!title || !category || !content_md) {
      return NextResponse.json(
        { error: "Mangler påkrevde felt" },
        { status: 400 }
      );
    }

    const result = await db.insert(content).values({
      title,
      category,
      content_md,
      status: "draft",
      created_at: new Date(),
      updated_at: new Date()
    }).returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('API /content POST error:', error);
    return NextResponse.json(
      { error: "Kunne ikke lagre innhold. Vennligst prøv igjen senere." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const deleted = await db.delete(content).where(eq(content.id, id)).returning();
  return NextResponse.json(deleted);
} 