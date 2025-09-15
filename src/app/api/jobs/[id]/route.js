// app/api/jobs/[id]/route.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params; // no need for await here
    const client = await clientPromise;
    const db = client.db("Job-Portal");

    const job = await db.collection("jobs").findOne({
      _id: new ObjectId(id),
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Return all job fields, converting _id to string
    return NextResponse.json(
      {
        _id: job._id.toString(),
        title: job.title,
        type: job.type,
        location: job.location,
        time: job.time,
        status: job.status,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        deadline: job.deadline,
        description: job.description,
        requirements: job.requirements,
        benefits: job.benefits,
        employerEmail: job.employerEmail,
        createdAt: job.createdAt,
        company: job.company || "",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(" API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("Job-Portal");

    const result = await db.collection("jobs").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}

// ✅ UPDATE
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const updateData = await req.json();

    const client = await clientPromise;
    const db = client.db("Job-Portal");

    const result = await db
      .collection("jobs")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}
