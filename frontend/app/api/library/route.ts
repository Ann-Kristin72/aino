import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { library } from "@/lib/schema";

// GET: Hent alle library-poster
export async function GET() {
  try {
    const rows = await db.select().from(library);
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch library." }, { status: 500 });
  }
}

// POST: Opprett ny library-post
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title & description required." }, { status: 400 });
    }

    const result = await db.insert(library).values({
      title,
      description,
    }).returning();

    return NextResponse.json(result[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create library." }, { status: 500 });
  }
}
