import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ message: 'Missing application ID or status.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Job-Portal");

    const result = await db.collection("applications").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Status updated successfully.' }, { status: 200 });

  } catch (error) {
    console.error("Failed to update application status:", error);
    return NextResponse.json({
      message: 'Failed to update application status.',
      error: error.message,
    }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const { applicationStatus } = await req.json();

  const client = await clientPromise;
  const db = client.db("Job-Portal");

  await db.collection("applications").updateOne(
    { _id: new ObjectId(id) },
    { $set: { applicationStatus } }
  );

  return NextResponse.json({ success: true });
}