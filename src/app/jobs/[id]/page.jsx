import ProtectedRoute from "@/Components/Private/ProtectedRoute";
import React from "react";
import Apply from "./button/Apply";

export default async function JobDetailPage({ params }) {
  const { id } =await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/${id}`,
    {
      cache: "no-store", // fresh data every time
    }
  );

  if (!res.ok) {
    return (
      <div className="text-center py-20 min-h-screen text-red-500">
        Job not found.
      </div>
    );
  }

  const job = await res.json();
console.log("job ",job);
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-3 py-10">
        <div className="bg-white shadow-xl rounded-2xl p-3 md:p-12 max-w-4xl mx-auto hover:shadow-2xl transition">
          {/* Job Header */}
          <div className="mb-6 border-b pb-4">
            <h1 className="text-3xl md:text-4xl text-center font-bold mb-2">{job.title}</h1>
            {job.company && (
              <p className="text-gray-600 text-lg mb-1 text-center">{job.company}</p>
            )}
            <p className="text-gray-500 text-center">{job.location}</p>
          </div>

          {/* Job Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Job Type:</span> {job.type}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Work Time:</span> {job.time}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Status:</span> {job.status}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Salary Range:</span> {job.salaryMin} - {job.salaryMax} BDT
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Deadline:</span>{" "}
                {new Date(job.deadline).toLocaleDateString()}
              </p>
              {job.employerEmail && (
                <p className="text-gray-700">
                  <span className="font-semibold">Contact:</span> {job.employerEmail}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
              <p className="text-gray-700">{job.requirements}</p>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
              <p className="text-gray-700">{job.benefits}</p>
            </div>
          )}

          {/* Apply Button */}
          <div className="text-center mt-8">
           <Apply job={job}></Apply>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
