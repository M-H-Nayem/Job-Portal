"use client";
import ProtectedRoute from "@/Components/Private/ProtectedRoute";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  const role = session?.user?.role || "jobseeker"; // Replace with real role from DB

  if (!session) {
    return <P>Login to get</P>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-[90vh] flex items-center justify-center p-3">

      <div className="bg-white p-10 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Dashboard 🎉</h1>
        <p className="text-gray-600 text-center">
          Logged in as{" "}
          <span className="font-semibold">{session?.user?.name}</span> ({role})
        </p>

        {role === "admin" && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2 text-center">Admin Panel</h2>
            <p className="text-center">Here you can manage users and jobs.</p>
          </div>
        )}

        {role === "jobseeker" && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2 text-center">Job Seeker Panel</h2>
            <p className="text-center">Browse jobs and track your applications.</p>
          </div>
        )}

        {role === "employer" && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2 text-center">Employer Panel</h2>
            <p className="text-center">Post jobs and manage applications from candidates.</p>
          </div>
        )}
      </div>

      </div>
    </ProtectedRoute>
  );
}
