"use client";
import ProtectedRoute from "@/Components/Private/ProtectedRoute";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserTie,
  FaBriefcase,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // TODO: real role should come from DB (session?.user?.role)
  const role = session?.user?.role || "jobseeker";
  // "admin" | "jobseeker" | "employer"

  const menuItems = {
    admin: [
      { name: "Manage Users", href: "/dashboard/users", icon: <FaUsers /> },
      { name: "Manage Jobs", href: "/dashboard/jobs", icon: <FaBriefcase /> },
      {
        name: "Profile",
        href: "/dashboard/profile",
        icon: <FaClipboardList />,
      },
    ],
    jobseeker: [
      // { name: "Browse Jobs", href: "/dashboard/browse", icon: <FaBriefcase /> },
      { name: "Profile", href: "/dashboard/profile", icon: <FaUserTie /> },

      {
        name: "Saved List",
        href: "/dashboard/saved-jobs",
        icon: <FaClipboardList />,
      },
      {
        name: "My Applications",
        href: "/dashboard/applications",
        icon: <FaClipboardList />,
      },
    ],
    employer: [
       {
        name: "Profile",
        href: "/dashboard/profile",
        icon: <FaUserTie />,
      },
      {
        name: "Post a Job",
        href: "/dashboard/post-job",
        icon: <FaBriefcase />,
      },
      {
        name: "My Posted Jobs",
        href: "/dashboard/my-jobs",
        icon: <FaClipboardList />,
      },
      {
        name: "Applicants",
        href: "/dashboard/applicants",
        icon: <FaClipboardList />,
      },

     
    ],
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "employer", "jobseeker"]}>
      <div className="flex min-h-screen bg-gray-100 relative">
        {/* Mobile Toggle Button */}
        <div className="md:hidden fixed top-4 left-4 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className={`p-2 bg-blue-600 text-white rounded-full shadow-lg absolute top-15  ${
              isOpen ? "hidden" : "block"
            }`}
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed md:sticky md:top-0 z-40 bg-white w-64 min-h-screen shadow-lg p-3 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center md:hidden mb-4">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button onClick={() => setIsOpen(false)} className="p-2">
              <FaTimes size={24} />
            </button>
          </div>
          <h2 className="hidden md:block text-2xl font-bold mb-6 text-gray-800">
            Dashboard
          </h2>
          <ul className="space-y-3">
            {menuItems[role]?.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="flex items-center gap-4 p-3 rounded-md text-gray-700 font-medium hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                  onClick={() => setIsOpen(false)} // Close sidebar on mobile
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-3 ">
          <div className="hidden md:flex justify-between items-center mb-6"></div>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
