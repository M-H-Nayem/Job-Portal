"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function AddJobForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    type: "Remote",
    location: "",
    time: "Full-time",
    status: "pending",
    company: "",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      employerEmail: session?.user?.email,
 
    };


    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error("Failed to post job");

      Swal.fire("Success!", "Job posted successfully", "success");
      setFormData({
        title: "",
        type: "Remote",
        location: "",
        time: "Full-time",
        status: "pending",
        company: "",
        salaryMin: "",
        salaryMax: "",
        deadline: "",
        description: "",
        requirements: "",
        benefits: "",
      });

      router.push("/dashboard/my-jobs");

    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Frontend Developer"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Job Type & Work Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Job Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            >
              <option>Remote</option>
              <option>Onsite</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Work Time</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
        </div>

        {/* Employer Email */}
        <div>
          <label className="block font-medium mb-1">Employer Email</label>
          <input
            type="email"
            value={session?.user?.email || ""}
            readOnly
            className="w-full border p-3 rounded-lg bg-gray-100"
          />
        </div>

        {/* Location & Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Dhaka, Bangladesh"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              placeholder="It Star Bangladesh"
              value={formData.company}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg w-full"
            />
            {console.log("Company value:", formData.company)}
          </div>
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Minimum Salary</label>
            <input
              type="number"
              name="salaryMin"
              placeholder="e.g. 20000"
              value={formData.salaryMin}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Maximum Salary</label>
            <input
              type="number"
              name="salaryMax"
              placeholder="e.g. 50000"
              value={formData.salaryMax}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-medium mb-1">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Job Description</label>
          <textarea
            name="description"
            placeholder="Write job description..."
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block font-medium mb-1">
            Requirements (comma separated)
          </label>
          <textarea
            name="requirements"
            placeholder="e.g. React, Node.js, MongoDB"
            value={formData.requirements}
            onChange={handleChange}
            rows="2"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Benefits */}
        <div>
          <label className="block font-medium mb-1">
            Benefits (comma separated)
          </label>
          <textarea
            name="benefits"
            placeholder="e.g. Health Insurance, Remote Work"
            value={formData.benefits}
            onChange={handleChange}
            rows="2"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
