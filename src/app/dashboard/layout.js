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
      { name: "Browse Jobs", href: "/dashboard/browse", icon: <FaBriefcase /> },
      {
        name: "My Applications",
        href: "/dashboard/applications",
        icon: <FaClipboardList />,
      },
      { name: "Profile", href: "/dashboard/profile", icon: <FaUserTie /> },
    ],
    employer: [
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
        name: "Profile",
        href: "/dashboard/profile",
        icon: <FaUserTie />,
      },
    ],
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "employer","jobseeker"]}>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed md:static z-20 bg-white w-64 h-full shadow-lg p-5 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform`}
        >
          <div className="flex justify-between items-center md:hidden">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={24} />
            </button>
          </div>
          <h2 className="hidden md:block text-xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-3">
            {menuItems[role]?.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 transition"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center md:hidden mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button onClick={() => setIsOpen(true)}>
              <FaBars size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
