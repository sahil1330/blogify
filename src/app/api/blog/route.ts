import { connectToDatabase } from "@/dbConfig/connectDB";
// import { ObjectId } from "@datastax/astra-db-ts";
import { NextRequest, NextResponse } from "next/server";
// type Params = { id: string };

export async function GET(req: NextRequest) {
  try {
    
    // Get the ID from the URL  ;
    const  searchParams  = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    // Connect to the database
    const db = await connectToDatabase();

    // Find the blog with the given ID
    const collection =  db.collection("blogs");
    const blog = await collection.findOne({ _id: id });
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs: " + (error as Error).message },
      { status: 500 }
    );
  }
}
