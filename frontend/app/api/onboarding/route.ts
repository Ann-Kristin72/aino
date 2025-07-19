import { NextRequest, NextResponse } from 'next/server';

// Use environment variable or fallback to production backend URL
// Extract base URL without /api suffix to avoid double /api
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ainomobil.no/api';
const BACKEND_URL = BASE_URL.endsWith('/api') ? BASE_URL.replace('/api', '') : BASE_URL;

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
    return NextResponse.json(
      { error: 'Intern serverfeil' },
      { status: 500 }
    );
  }
} 