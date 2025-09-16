"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function MyJobsPage() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!session?.user?.email) return;

  // fetch jobs by email
  async function fetchMyJobs() {
    try {
      const res = await fetch(`/api/jobs?email=${session?.user?.email}`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyJobs();
  }, [session]);

  // delete job
  async function handleDelete(id) {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This job will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete job");

        Swal.fire("Deleted!", "Your job has been deleted.", "success");
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  }

  // update job
  async function handleUpdate(job) {
    const { value: formValues } = await Swal.fire({
      title: "Update Job",
      html: `
        <input id="title" class="swal2-input" placeholder="Title" value="${job.title}">
        <input id="location" class="swal2-input" placeholder="Location" value="${job.location}">
        <input id="salaryMin" type="number" class="swal2-input" placeholder="Min Salary" value="${job.salaryMin}">
        <input id="salaryMax" type="number" class="swal2-input" placeholder="Max Salary" value="${job.salaryMax}">
        <input id="deadline" type="date" class="swal2-input" placeholder="Deadline" value="${job.deadline}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        return {
          title: document.getElementById("title").value,
          location: document.getElementById("location").value,
          salaryMin: Number(document.getElementById("salaryMin").value),
          salaryMax: Number(document.getElementById("salaryMax").value),
        };
      },
    });

    if (formValues) {
      try {
        const res = await fetch(`/api/jobs/${job._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });

        if (!res.ok) throw new Error("Failed to update job");

        Swal.fire("Updated!", "Your job has been updated.", "success");
        fetchMyJobs();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  }

  if (status === "loading" || loading) {
    return <div className="text-center py-20 min-h-screen">Loading...</div>;
  }

  if (!jobs.length) {
    return <div className="text-center py-20 min-h-screen">No jobs posted yet.</div>;
  }

  return (
    <div className="container mx-auto py-3">
      <h1 className="text-3xl font-bold mb-6 text-center">My Posted Jobs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 mb-2">Company- {job.company}</p>
            <p className="text-gray-500 mb-2">Location- {job.location}</p>
            <p className="text-gray-700 mb-2">Type- {job.time}</p>
            <p className="text-gray-700 mb-2">
             Salury- {job.salaryMin} - {job.salaryMax} BDT
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Deadline: {new Date(job.deadline).toLocaleDateString()}
            </p>
            <p className="text-gray-700 line-clamp-3 mb-4">Status- {job.status}</p>
            <p className="text-gray-700 line-clamp-3 mb-4">{job.description}</p>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleUpdate(job)}
                className="flex-1 bg-yellow-500 text-white py-1 rounded-lg hover:bg-yellow-600 transition "
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
