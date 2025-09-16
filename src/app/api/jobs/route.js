// app/api/jobs/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// ✅ GET all jobs
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("Job-Portal");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
      const employerEmail = searchParams.get("employerEmail");

    let query = {};
    
    if (email) {
      query = { employerEmail: email }; 
    }
     if (employerEmail) {
      query = { employerEmail: employerEmail }; // Filter by the employer's email
    }

    const jobs = await db.collection("jobs").find(query).toArray();

    const jobsData = jobs.map((job) => ({
      _id: job._id.toString(),
      title: job.title,
      company: job.company,
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
    }));

    return NextResponse.json(jobsData, { status: 200 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// ✅ POST a new job
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("Job-Portal");

    const body = await req.json();

    const newJob = {
      title: body.title,
      type: body.type,
      location: body.location,
      time: body.time,
      status: body.status,
      company: body.company,
      salaryMin: body.salaryMin,
      salaryMax: body.salaryMax,
      deadline: body.deadline,
      description: body.description,
      requirements: body.requirements,
      benefits: body.benefits,
      employerEmail: body.employerEmail,
      createdAt: new Date(), // auto set createdAt
    };

    const result = await db.collection("jobs").insertOne(newJob);

    return NextResponse.json(
      {
        message: "Job created successfully",
        jobId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}


