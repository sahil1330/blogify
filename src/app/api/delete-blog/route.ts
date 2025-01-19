import { connectToDatabase } from "@/dbConfig/connectDB";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(req: NextRequest) {
  try {
    // Get the ID from the URL  ;
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const db = await connectToDatabase();
    await db.collection("blogs").deleteOne({ _id: id });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blogs: " + (error as Error).message },
      { status: 500 }
    );
  }
}
