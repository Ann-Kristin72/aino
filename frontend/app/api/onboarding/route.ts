import { NextRequest, NextResponse } from 'next/server';

// Hardcode the correct backend URL to avoid environment variable issues
const BACKEND_URL = 'https://api.ainomobil.no';

// Debug logging
console.log("🔍 Environment Debug:");
console.log("NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
console.log("BACKEND_URL (hardcoded):", BACKEND_URL);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("✅ Frontend API: POST /api/onboarding - calling backend...");
    console.log("🌐 Backend URL:", BACKEND_URL);
    console.log("📝 Onboarding data:", body);
    
    const response = await fetch(`${BACKEND_URL}/api/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    console.log("🔍 Response status:", response.status);
    console.log("🔍 Response headers:", Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log("✅ Backend response:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Onboarding feilet' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('🔥 Frontend API ERROR /api/onboarding:', error);
    console.error('🔥 Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Backend timeout - prøv igjen' },
          { status: 408 }
        );
      }
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Kan ikke nå backend - sjekk nettverk' },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Intern serverfeil' },
      { status: 500 }
    );
  }
} 