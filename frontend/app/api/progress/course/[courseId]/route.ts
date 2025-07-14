import { NextRequest, NextResponse } from 'next/server';

// Use environment variable or fallback to production backend URL
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.ainomobil.no';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const { courseId } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'userId er påkrevd' }, { status: 400 });
    }

    const response = await fetch(`${backendUrl}/api/progress/course/${courseId}?userId=${userId}`);

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Noe gikk galt ved henting av progresjon' },
      { status: 500 }
    );
  }
} 