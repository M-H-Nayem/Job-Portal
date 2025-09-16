"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function EmployerApplicationsPage() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Please login to view this page.</p>
      </div>
    );
  }

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await fetch(`/api/applications?email=${session.user.email}`);
        if (!res.ok) {
          throw new Error("Failed to fetch applications.");
        }
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load applications. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [session.user.email]);

  async function handleStatusUpdate(id, newStatus) {
    const actionText = newStatus === "accepted" ? "accept" : "reject";

    const result = await Swal.fire({
      title: `Are you sure you want to ${actionText} this application?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "accepted" ? "#22c55e" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionText} it!`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/applications/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationStatus: newStatus }),
        });
        if (res.ok) {
          setApplications((prev) =>
            prev.map((app) =>
              app._id === id ? { ...app, applicationStatus: newStatus } : app
            )
          );
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `Application has been ${actionText}ed.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to update application status.",
          });
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unexpected error occurred. Please check your network.",
        });
      }
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading applications...</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return <p className="p-6 text-gray-500">No one has applied to your jobs yet.</p>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Applicants for Your Jobs
      </h1>

      {applications.map((app) => (
        <div
          key={app._id}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-400 "
        >
          {/* Job Title and Status */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-900">{app.jobTitle}</h2>
            <span
              className={`mt-2 sm:mt-0 px-4 py-1 rounded-full font-semibold text-sm transition-colors duration-300 w-fit ${
                app.applicationStatus === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : app.applicationStatus === "accepted"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {app.applicationStatus}
            </span>
          </div>

          {/* Applicant Info */}
          <div className="space-y-2 text-gray-700">
            <p className="text-sm">
              <span className="font-medium text-gray-800">Applicant:</span>{" "}
              {app.applicantEmail}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-800">Applied On:</span>{" "}
              {new Date(app.appliedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Action Buttons */}
          {app.applicationStatus === "pending" && (
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => handleStatusUpdate(app._id, "accepted")}
              className="btn bg-green-600 text-white p-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => handleStatusUpdate(app._id, "rejected")}
              className="btn bg-red-600 text-white p-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Reject
            </button>
          </div>
        )}
        </div>
      ))}
    </div>
  );
}