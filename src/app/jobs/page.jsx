"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();

        // শুধু Approved jobs রাখুন
        const approvedJobs = data?.filter(job => job.status === "Approved");
        setJobs(approvedJobs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);
  console.log(jobs);

  if (loading)
    return <div className="text-center py-20 min-h-screen">Loading...</div>;
  if (!jobs.length)
    return (
      <div className="text-center py-20 min-h-screen">
        No approved jobs available.
      </div>
    );

  return (
    <div className="container max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Jobs</h1>
      <div className="flex flex-col gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="w-full bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              {/* Left Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-500 mb-1">{job.location}</p>
                <p className="text-gray-500 mb-1">
                  Type: {job.type} | Time: {job.time}
                </p>
                <p className="text-gray-500 mb-1">
                  Salary: {job.salaryMin} - {job.salaryMax} BDT
                </p>
                
              </div>

              {/* Right Section */}
              <div className="flex justify-end items-center flex-col  sm:flex-col gap-2 mt-4 md:mt-0">
                <Link
                  href={`/jobs/${job._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                >
                  View Details
                </Link>
                <p className="text-gray-500 mb-2">
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
