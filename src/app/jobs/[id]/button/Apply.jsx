"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Apply = ({job}) => {
   const { data: session, status } = useSession();
    const [applying, setApplying] = useState(false);
    // console.log("applied");

    const handleApply = async () => {
  if (status === "unauthenticated") {
   router.push("/login");
   return;
  }

  console.log(job);
  setApplying(true);
  try {
   const applicationData = {
    jobId: job._id,
    jobTitle: job.title,
    employerEmail:job.employerEmail,
    applicantEmail: session?.user?.email,
    applicationStatus: "pending",
   };

   const res = await fetch("/api/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(applicationData),
   });

   if (!res.ok) {
    throw new Error("Failed to submit application");
   }

   Swal.fire("Success!", "Your application has been submitted.", "success");
  } catch (error) {
   Swal.fire("Error", "There was a problem submitting your application.", "error");
  } finally {
   setApplying(false);
  }
 };
  return (
    <div>
      <div className="text-center mt-8">
        <button
          onClick={handleApply}
          disabled={applying}
          className={`px-8 py-3 font-semibold rounded-xl transition ${
            applying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {applying ? "Applying..." : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default Apply;
