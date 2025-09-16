"use client";

import ProtectedRoute from "@/Components/Private/ProtectedRoute";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function ManageApplicationsPage() {
  const { jobId } = useParams();
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      if (status !== "authenticated" || session.user.role !== "employer") {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(`/api/applications?jobId=${jobId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch applications.");
        }
        const data = await res.json();
        setApplications(data.data);
      } catch (e) {
        setError("Failed to load applications. Please try again later.");
        Swal.fire("Error!", "Failed to load applications.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [jobId, session, status]);

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status.");
      }

      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      Swal.fire("Success!", `Application ${newStatus} successfully.`, "success");
    } catch (e) {
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600 text-lg">Loading applications...</p>
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
    <ProtectedRoute allowedRoles={["employer"]}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Manage Applications
        </h1>
        {applications?.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No applications for this job yet.
          </p>
        ) : (
          <div className="space-y-6">
            {applications?.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {app.applicantEmail}
                  </h2>
                  <p className="text-gray-600">
                    Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
                      app.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : app.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {app.status}
                  </span>
                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateApplicationStatus(app._id, "accepted")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          updateApplicationStatus(app._id, "rejected")
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}