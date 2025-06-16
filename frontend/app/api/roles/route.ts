import { db } from "@/lib/db";
import { roles } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allRoles = await db.select().from(roles);
    return NextResponse.json(allRoles);
  } catch (err) {
    console.error("Error fetching roles:", err);
    return NextResponse.json([], { status: 500 });
  }
} 