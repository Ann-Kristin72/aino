import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    const { unitId } = await params;
    
    console.log(`API /content/unit/[unitId]: Fetching unit with ID: ${unitId}`);
    
    const response = await fetch(`${process.env.BACKEND_URL || 'http://127.0.0.1:3001'}/api/content/unit/${unitId}`);
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`API /content/unit/[unitId]: Found unit: ${result.unit.title}`);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /content/unit/[unitId] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch unit' },
      { status: 500 }
    );
  }
} 