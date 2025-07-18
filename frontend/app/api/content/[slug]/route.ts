import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    console.log(`API /content/[slug]: Fetching course with slug: ${slug}`);
    
    // Use environment variable or fallback to production backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://aino-backend-linux.azurewebsites.net';
    const response = await fetch(`${backendUrl}/api/content/slug/${slug}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`API /content/[slug]: Found course: ${result.title}`);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /content/[slug] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
} 