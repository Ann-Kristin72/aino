import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET() {
  try {
    console.log("✅ Root API: GET /api/admins - calling backend...");
    
    const response = await fetch(`${BACKEND_URL}/api/admins`);
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("🔥 Root API ERROR /api/admins:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) return new NextResponse("Name is required", { status: 400 });

    console.log("✅ Root API: POST /api/admins - calling backend...");
    
    const response = await fetch(`${BACKEND_URL}/api/admins`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name, 
        email: `${name.toLowerCase()}@example.com` 
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("🔥 Root API ERROR POST /api/admins:", error);
    return new NextResponse("Could not create admin", { status: 500 });
  }
} 