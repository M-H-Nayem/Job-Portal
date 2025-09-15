// app/api/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { name, email, password , role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Job-Portal");

    // Check if user exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const newUser = await db.collection("users").insertOne({
      name,
      email,
      role,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: newUser.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
