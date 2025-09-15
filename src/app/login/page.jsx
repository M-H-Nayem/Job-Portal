// app/login/page.js
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/", // Redirect after login
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>

        <hr className="my-6" />

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-red-500 text-white py-2 rounded"
        >
          Sign in with Google
        </button>
      <p className="text-center mt-5 ">New in jobPortal? <Link href={'/register'} className="underline text-blue-700"> Register</Link></p>
      </div>
    </div>
  );
}
