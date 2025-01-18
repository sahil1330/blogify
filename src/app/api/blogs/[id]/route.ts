"use server";
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../dbConfig/connectDB';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = connectToDatabase();
    const { id } = params;
    const updatedData = await request.json();
    const result = await db.collection('blogs').updateOne({ id: Number(id) }, { $set: updatedData });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}