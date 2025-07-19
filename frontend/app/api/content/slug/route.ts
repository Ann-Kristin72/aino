import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      );
    }
    
    console.log(`API /content/[slug]: Fetching course with slug: ${slug}`);
    
    // Use environment variable or fallback to production backend URL
    // Extract base URL without /api suffix to avoid double /api
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ainomobil.no/api';
    const backendUrl = BASE_URL.endsWith('/api') ? BASE_URL.replace('/api', '') : BASE_URL;
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