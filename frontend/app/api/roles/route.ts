import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET() {
  try {
    console.log("✅ Frontend API: GET /api/roles - calling backend...");
    
    const response = await fetch(`${BACKEND_URL}/api/roles`);
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("🔥 Frontend API ERROR /api/roles:", err);
    return NextResponse.json([], { status: 500 });
  }
} 