import { NextRequest, NextResponse } from "next/server";

// Use environment variable or fallback to production backend URL
// Extract base URL without /api suffix to avoid double /api
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ainomobil.no/api';
const BACKEND_URL = BASE_URL.endsWith('/api') ? BASE_URL.replace('/api', '') : BASE_URL;

export async function GET() {
  try {
    console.log('API /content: Fetching content from backend...');
    console.log('Backend URL:', BACKEND_URL);
    
    const response = await fetch(`${BACKEND_URL}/api/content`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      // Add timeout and better error handling
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('API /content result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /content error:', error);
    
    // Return more detailed error information
    return NextResponse.json(
      { 
        error: "Kunne ikke hente innhold. Vennligst prøv igjen senere.",
        details: error instanceof Error ? error.message : 'Unknown error',
        backendUrl: BACKEND_URL
      },
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
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      },
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
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