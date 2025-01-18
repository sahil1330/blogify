"use server";
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../dbConfig/connectDB';

export async function GET() {
  try {
    const db = connectToDatabase();
    const blogs = await db.collection('blogs').find().toArray();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
}

export async function POST(request: Request) {
  try {
    const db = connectToDatabase();
    const newBlog = await request.json();
    await db.collection('blogs').insertOne(newBlog);
    return NextResponse.json({ message: 'Blog created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
}