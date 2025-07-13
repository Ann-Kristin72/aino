import { NextRequest, NextResponse } from 'next/server';

// Use environment variable or fallback to production backend URL
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://aino-backend.azurewebsites.net';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const { unitId } = await params;
    const body = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'userId er påkrevd' }, { status: 400 });
    }

    const response = await fetch(`${backendUrl}/api/progress/unit/${unitId}?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        courseId: body.courseId,
        nanoId: body.nanoId,
        unitId
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error marking unit as completed:', error);
    return NextResponse.json(
      { error: 'Noe gikk galt ved markering av unit som fullført' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const { unitId } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'userId er påkrevd' }, { status: 400 });
    }

    const response = await fetch(`${backendUrl}/api/progress/unit/${unitId}?userId=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error removing unit completion:', error);
    return NextResponse.json(
      { error: 'Noe gikk galt ved sletting av fullføring' },
      { status: 500 }
    );
  }
} 