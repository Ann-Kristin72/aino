import { NextRequest, NextResponse } from 'next/server';

// Use environment variable or fallback to production backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://aino-backend-linux.azurewebsites.net';

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
    });

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
    return NextResponse.json(
      { error: 'Intern serverfeil' },
      { status: 500 }
    );
  }
} 