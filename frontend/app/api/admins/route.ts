import { NextResponse } from "next/server";

// Use environment variable or fallback to production backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://aino-backend-linux.azurewebsites.net';

export async function GET() {
  try {
    console.log("✅ Frontend API: GET /api/admins - calling backend...");
    
    const response = await fetch(`${BACKEND_URL}/api/admins`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("✅ Frontend API: Found admins:", result);
    return NextResponse.json(Array.isArray(result) ? result : []);

  } catch (error) {
    console.error("🔥 Frontend API ERROR /api/admins:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    console.log("✅ Frontend API: POST /api/admins - calling backend...");
    
    const response = await fetch(`${BACKEND_URL}/api/admins`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("🔥 Frontend API ERROR POST /api/admins:", error);
    return NextResponse.json(
      { error: "Could not create admin" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    console.log("✅ Frontend API: DELETE /api/admins - calling backend...");
    
    const response = await fetch(`${BACKEND_URL}/api/admins/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("🔥 Frontend API ERROR DELETE /api/admins:", error);
    return NextResponse.json(
      { error: "Could not delete admin" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, role_id } = body;

    if (!id || !name || !email) {
      return NextResponse.json(
        { error: "ID, name and email are required" },
        { status: 400 }
      );
    }

    console.log("✅ Frontend API: PUT /api/admins - calling backend...");
    
    const response = await fetch(`${BACKEND_URL}/api/admins/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json"
      },
      body: JSON.stringify({ name, email, role_id }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("🔥 Frontend API ERROR PUT /api/admins:", error);
    return NextResponse.json(
      { error: "Could not update admin" },
      { status: 500 }
    );
  }
} 