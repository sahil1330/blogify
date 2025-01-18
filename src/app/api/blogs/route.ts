"use server";
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../dbConfig/connectDB';

export async function GET() {
  try {
    const db = connectToDatabase();
    const blogs = await db.collection('blogs').find({}).toArray();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('GET /api/blogs error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = connectToDatabase();
    const newBlog = await request.json();

    // Basic validation
    if (
      !newBlog.title ||
      !newBlog.excerpt ||
      !newBlog.content ||
      !newBlog.img ||
      !newBlog.author ||
      !newBlog.date ||
      !newBlog.section
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.collection('blogs').insertOne(newBlog);
    return NextResponse.json({ message: 'Blog created successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/blogs error:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}