import { NextResponse } from "next/server";
import { getContentById } from "@aino/core/content/content.service";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const content = await getContentById(params.id);
    
    if (!content) {
      return NextResponse.json(
        { error: "Innhold ikke funnet" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: content });
  } catch (error) {
    console.error("Feil ved henting av innhold:", error);
    return NextResponse.json(
      { error: "Kunne ikke hente innhold" },
      { status: 500 }
    );
  }
} 