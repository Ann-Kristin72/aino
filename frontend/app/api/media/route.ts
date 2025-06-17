import { NextRequest, NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { media } from "@/drizzle/schema";

export async function GET() {
  const result = await db.select().from(media).orderBy(media.createdAt);
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const body = await req.formData();
  // For MVP: Vi tar kun filename og fake URL
  const filename = body.get("filename") as string;
  const url = `/uploads/${filename}`; // Dummy local URL
  const newMedia = await db.insert(media).values({
    filename,
    url,
    type: body.get("type") as string,
    tags: body.get("tags") as string,
  }).returning();
  return NextResponse.json(newMedia);
} 