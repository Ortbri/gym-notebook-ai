import { getDB } from "@/drizzle/db";
import { waitlistUsers } from "@/drizzle/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = getDB();
    // Simple query to test the database connection
    const result = await db.select().from(waitlistUsers).all();
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
} 