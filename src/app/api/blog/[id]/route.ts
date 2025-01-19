import { connectToDatabase } from "@/dbConfig/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    console.log(id);
    // Connect to the database
    const db = connectToDatabase();

    // Find the blog with the given ID
    const collection = await db.collection("blogs");
    const blog = await collection.findOne({ _id: id });
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs: " + (error as Error).message },
      { status: 500 }
    );
  }
}
