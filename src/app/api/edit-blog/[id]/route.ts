import { connectToDatabase } from "@/dbConfig/connectDB";
import { uploadToCloudinary } from "@/lib/uploadToCloudnary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const db = await connectToDatabase();
    const collection = db.collection("blogs");
    const formData = await req.formData();
    const videoFile = formData?.get("videoFile") as File;
    const title = formData?.get("title");
    const content = formData?.get("content");
    const tags = formData?.get("tags");
    const category = formData?.get("category");
    // const author = formData?.get("author");
    let uploadResult;
    try {
      uploadResult = await uploadToCloudinary(videoFile);
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to upload video: " + (error as Error).message },
        { status: 400 }
      );
    }
    console.log(
      title + " ",
      content + " ",
      tags + " ",
      category + " ",
      uploadResult.secure_url + "",
      uploadResult.public_id
    );

    const blog = await collection.updateOne(
      { _id: id },
      {
        $set: {
          title,
          content,
          tags,
          category,
          videoUrl: uploadResult.secure_url,
          videoPublicId: uploadResult.public_id,
          updatedAt: new Date(),
        },
      }
    );

    if (!blog) {
      return NextResponse.json(
        { message: "Failed to edit blog" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Blog edited successfully", blog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
