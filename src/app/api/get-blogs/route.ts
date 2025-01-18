/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDatabase } from "@/dbConfig/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs: " + (error as Error).message },
      { status: 500 }
    );
  }
}
