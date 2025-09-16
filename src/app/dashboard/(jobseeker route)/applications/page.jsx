"use client";

import ProtectedRoute from "@/Components/Private/ProtectedRoute";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function MyApplicationsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (status !== "authenticated") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `/api/applications?applicantEmail=${session.user.email}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch applications.");
        }

        const data = await res.json();
        setApplications(data.data);
      } catch (e) {
        setError("Failed to load your applications. Please try again later.");
        Swal.fire("Error!", "Failed to load applications.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600 text-lg">Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["jobseeker"]}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Applications
        </h1>
        {applications.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You have not applied for any jobs yet.
          </p>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {app.jobDetails?.title || "N/A"}
                  </h2>
                  <p className="text-gray-600">
                    Company: {app.jobDetails?.company || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Location: {app.jobDetails?.location || "N/A"}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
                      app.applicationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : app.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {app.applicationStatus}
                    {console.log(app)}
                  </span>
                  <Link
                    href={`/jobs/${app.jobId}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}