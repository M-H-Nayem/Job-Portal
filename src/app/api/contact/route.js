// app/api/contact/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Reuse DB connection

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to DB
    const client = await clientPromise;
    const db = client.db("Job-Portal");

    // Insert message into "messages" collection
    await db.collection("messages").insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Message stored successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// (Optional) GET method to fetch all messages (for admin dashboard later)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Job-Portal");

    const messages = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error(" Fetch Messages Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
