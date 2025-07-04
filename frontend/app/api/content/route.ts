import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET() {
  try {
    console.log('API /content: Fetching content from backend...');
    const response = await fetch(`${BACKEND_URL}/api/content`);
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const result = await response.json();
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
    const { title, content, category, location, targetUser, language, author, revisionInterval, keywords, audience } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Tittel og innhold er påkrevd" },
        { status: 400 }
      );
    }

    console.log('API /content POST: Sending data to backend:', { title, category, location, targetUser });
    
    // Send data to backend
    const response = await fetch(`${BACKEND_URL}/api/content`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        category,
        location,
        targetUser,
        language,
        author,
        revisionInterval,
        keywords,
        audience
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /content POST error:', error);
    return NextResponse.json(
      { error: "Kunne ikke lagre innhold. Vennligst prøv igjen senere." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    
    const response = await fetch(`${BACKEND_URL}/api/content/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /content DELETE error:', error);
    return NextResponse.json(
      { error: "Kunne ikke slette innhold. Vennligst prøv igjen senere." },
      { status: 500 }
    );
  }
} 