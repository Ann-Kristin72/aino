import { NextResponse } from "next/server";

// Extract base URL without /api suffix to avoid double /api
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ainomobil.no/api';
const BACKEND_URL = BASE_URL.endsWith('/api') ? BASE_URL.replace('/api', '') : BASE_URL;

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    console.log("✅ Frontend API: DELETE /api/admins/[id] - calling backend...");
    
    const response = await fetch(`${BACKEND_URL}/api/admins/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("🔥 Frontend API ERROR DELETE /api/admins/[id]:", error);
    return NextResponse.json(
      { error: "Could not delete admin" },
      { status: 500 }
    );
  }
} 