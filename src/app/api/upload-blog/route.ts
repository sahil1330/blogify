import { connectToDatabase } from "@/dbConfig/connectDB";
import { uploadToCloudinary } from "@/lib/uploadToCloudnary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("blogs");
    const formData = await req.formData();
    const videoFile = formData?.get("videoFile") as File;
    const title = formData?.get("title");
    const content = formData?.get("content");
    const tags = formData?.get("tags");
    const category = formData?.get("category");
    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(videoFile);
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to upload video: " + (error as Error).message },
        { status: 400 }
      );
    }

    const blog = await collection.insertOne({
      title,
      content,
      tags,
      category,
      videoUrl: uploadResult.secure_url,
      videoPublicId: uploadResult.public_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Failed to upload blog" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Blog uploaded successfully", blog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
