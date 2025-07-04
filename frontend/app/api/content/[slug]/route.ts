import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    console.log(`API /content/[slug]: Fetching course with slug: ${slug}`);
    
    const response = await fetch(`${process.env.BACKEND_URL || 'http://127.0.0.1:3001'}/api/content/slug/${slug}`);
    
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