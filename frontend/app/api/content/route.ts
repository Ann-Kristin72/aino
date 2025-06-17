import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { content } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    console.log('API /content: Fetching content from database...');
    const result = await db.select().from(content).orderBy(content.createdAt);
    console.log('API /content result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /content error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newContent = await db.insert(content).values({
    title: body.title,
    category: body.category,
    content_md: body.content_md,
    metadata: body.metadata || "",
    status: body.status || "draft",
    authorType: body.authorType || "human",
  }).returning();
  return NextResponse.json(newContent);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const deleted = await db.delete(content).where(eq(content.id, id)).returning();
  return NextResponse.json(deleted);
} 