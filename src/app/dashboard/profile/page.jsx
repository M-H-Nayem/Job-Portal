"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);

  console.log(session);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  // Example user
  const user = {
    name: session.user?.name || "John Doe",
    email: session.user?.email || "john@example.com",
    role: session.user?.role || "jobseeker",
    bio: "Passionate developer seeking opportunities to grow.",
    skills: ["React", "Next.js", "Node.js"],
    company: "Tech Corp",
    image: session.user?.image || "https://i.pravatar.cc/150?u=profile",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
          <img
            src={user.image}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
          <div className="mt-4 sm:mt-0 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
              {user.role}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 border-t pt-6 space-y-4 text-gray-700">
          {user.role === "jobseeker" && (
            <>
              <p>
                <span className="font-semibold">Bio:</span> {user.bio}
              </p>
              <p>
                <span className="font-semibold">Skills:</span>{" "}
                {user.skills.join(", ")}
              </p>
            </>
          )}

          {user.role === "employer" && (
            <p>
              <span className="font-semibold">Company:</span> {user.company}
            </p>
          )}

          {user.role === "admin" && (
            <p className="text-red-600 font-semibold">
              Admin Access: Full system control
            </p>
          )}
        </div>

        {/* Edit Section */}
        {/* <div className="mt-8">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditing(false);
                alert("Profile updated!");
              }}
              className="space-y-4"
            >
              <input
                type="text"
                defaultValue={user.name}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                defaultValue={user.bio}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="ml-3 px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </form>
          )}
        </div> */}
      </div>
    </div>
  );
}
