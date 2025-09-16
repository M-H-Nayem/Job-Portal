import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicantEmail = searchParams.get("applicantEmail");
    const email = searchParams.get("email");
    const jobId = searchParams.get("jobId");

    if (applicantEmail) {
      if (!applicantEmail) {
        return NextResponse.json(
          {
            message: "Applicant email is required.",
          },
          { status: 400 }
        );
      }

      const client = await clientPromise;
      const db = client.db("Job-Portal");

      const applicationsWithJobDetails = await db
        .collection("applications")
        .aggregate([
          // Stage 1: Filter applications by applicantEmail
          {
            $match: {
              applicantEmail: applicantEmail,
            },
          },
          // NEW Stage: Convert jobId string to ObjectId
          {
            $addFields: {
              jobObjectId: { $toObjectId: "$jobId" },
            },
          },
          // Stage 3: Join with the jobs collection using the new ObjectId field
          {
            $lookup: {
              from: "jobs",
              localField: "jobObjectId", // Use the newly created ObjectId field
              foreignField: "_id",
              as: "jobDetails",
            },
          },
          // Stage 4: Unwind the jobDetails array to flatten the data
          {
            $unwind: "$jobDetails",
          },
          // Stage 5: Project the desired fields for the final output
          {
            $project: {
              _id: 1,
              jobId: 1,
              jobTitle: 1,
              applicantEmail: 1,
              employerEmail: 1,
              status: 1,
              applicationStatus: 1,
              appliedAt: 1,
              "jobDetails.title": "$jobDetails.title",
              "jobDetails.company": "$jobDetails.company",
              "jobDetails.location": "$jobDetails.location",
            },
          },
        ])
        .sort({ appliedAt: -1 })
        .toArray();

      return NextResponse.json(
        {
          message: "Applications fetched successfully",
          data: applicationsWithJobDetails,
        },
        { status: 200 }
      );
    } 
    else if (jobId) {
      try {
        if (!jobId) {
          return NextResponse.json(
            {
              message: "Job ID is required.",
            },
            { status: 400 }
          );
        }

        const client = await clientPromise;
        const db = client.db("Job-Portal");

        const applications = await db
          .collection("applications")
          .find({ jobId: jobId })
          .toArray();

        return NextResponse.json(
          {
            message: "Applications fetched successfully",
            data: applications,
          },
          { status: 200 }
        );
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        return NextResponse.json(
          {
            message: "Failed to fetch applications",
            error: error.message,
          },
          { status: 500 }
        );
      }
    }
    else if (email) {
      const client = await clientPromise;
  const db = client.db("Job-Portal");

  const apps = await db.collection("applications").find({ employerEmail: email }).toArray();

  return NextResponse.json(apps);
    }
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch applications",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ✅ POST a new job
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("Job-Portal");

    const body = await req.json();

    const newApplication = {
      jobId: body.jobId,
      jobTitle: body.jobTitle,
      employerEmail: body.employerEmail,
      applicantEmail: body.applicantEmail,
      applicationStatus: body.applicationStatus,
      appliedAt: new Date(), // auto set createdAt
    };

    const result = await db
      .collection("applications")
      .insertOne(newApplication);

    return NextResponse.json(
      {
        message: "Application  successfully complete",
        jobId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to Apply" }, { status: 500 });
  }
}
