import { NextResponse } from 'next/server';
import { getAllContentMeta } from '@core/registry';
import { ContentMeta } from '@core/types/ContentMeta';

export async function GET() {
  try {
    const courses = await getAllContentMeta();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Feil ved henting av kurs:', error);
    return NextResponse.json(
      { error: 'Kunne ikke hente kurs' },
      { status: 500 }
    );
  }
} 