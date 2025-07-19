import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  try {
    const { unitId } = await params;
    
    console.log(`API /content/unit/[unitId]: Fetching unit with ID: ${unitId}`);
    
    // Extract base URL without /api suffix to avoid double /api
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ainomobil.no/api';
    const BACKEND_URL = BASE_URL.endsWith('/api') ? BASE_URL.replace('/api', '') : BASE_URL;
    
    const response = await fetch(`${BACKEND_URL}/api/content/unit/${unitId}`);
    
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