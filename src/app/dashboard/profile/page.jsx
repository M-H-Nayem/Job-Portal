"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Initialize formData when session is available
  useEffect(() => {
    if (session) {
      setFormData({
        name: session.user?.name || "",
        email: session.user?.email || "",
        role: session.user?.role || "jobseeker",
        bio: "", // You will fetch this from your database
        skills: "", // You will fetch this from your database
        company: "", // You will fetch this from your database
        image: session.user?.image || "https://i.pravatar.cc/150?u=profile",
      });
    }
  }, [session]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update the profile
    console.log("Updated Profile Data:", formData);

    
    
    // Simulate successful update
    Swal.fire({
      icon: "success",
      title: "Profile Updated!",
      text: "Your profile has been saved successfully.",
    });

    setEditing(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  // Fallback before formData is initialized
  if (Object.keys(formData).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          Loading profile data...
        </p>
      </div>
    );
  }

  return (
<div className="min-h-[90vh] flex items-center justify-center ">

    <div className="max-w-3xl mx-auto px-3 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
          <img
            src={formData.image}
            alt={formData.name}
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
          <div className="mt-4 sm:mt-0 text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{formData.name}</h1>
            <p className="text-gray-500">{formData.email}</p>
            <span className="inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700 capitalize">
              {formData.role}
            </span>
          </div>
          {/* Edit/Save Button */}
          <div className="mt-4 sm:mt-0">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
                >
                  <FaSave />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-300 transition"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-8 border-t pt-6 space-y-4 text-gray-700">
          {!editing ? (
            <>
              {formData.role === "jobseeker" && (
                <>
                  <p>
                    <span className="font-semibold">Bio:</span> {formData.bio || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Skills:</span>{" "}
                    {formData.skills || "N/A"}
                  </p>
                </>
              )}
              {formData.role === "employer" && (
                <p>
                  <span className="font-semibold">Company:</span> {formData.company || "N/A"}
                </p>
              )}
              {formData.role === "admin" && (
                <p className="text-red-600 font-semibold">
                  Admin Access: Full system control
                </p>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="font-semibold">Name:</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 mt-1"
                />
              </label>
              
              {formData.role === "jobseeker" && (
                <>
                  <label className="block">
                    <span className="font-semibold">Bio:</span>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 mt-1"
                      rows="3"
                    />
                  </label>
                  <label className="block">
                    <span className="font-semibold">Skills (comma separated):</span>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 mt-1"
                    />
                  </label>
                </>
              )}
              {formData.role === "employer" && (
                <label className="block">
                  <span className="font-semibold">Company Name:</span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 mt-1"
                  />
                </label>
              )}
            </form>
          )}
        </div>
      </div>
    </div>

</div>

  );
}