import { NextResponse } from "next/server";
import { parseMarkdown } from "@aino/core/content/parser/parseMarkdown";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  if (!id) {
    return NextResponse.json(
      { error: "Mangler innholds-ID" },
      { status: 400 }
    );
  }

  try {
    console.log(`📑 Henter innhold med ID: ${id}`);
    const filePath = path.join(process.cwd(), "..", "content", `${id}.md`);
    console.log(`🔍 Leter etter fil: ${filePath}`);
    
    const parsed = parseMarkdown(filePath);
    console.log(`✅ Fant og parset innhold: ${parsed.meta.title}`);
    
    return NextResponse.json({
      success: true,
      data: parsed
    });
  } catch (error) {
    console.error(`❌ Feil ved henting av innhold:`, error);
    return NextResponse.json(
      { 
        success: false,
        error: `Fant ikke innhold med ID: ${id}`,
        details: error instanceof Error ? error.message : 'Ukjent feil'
      },
      { status: 404 }
    );
  }
} 