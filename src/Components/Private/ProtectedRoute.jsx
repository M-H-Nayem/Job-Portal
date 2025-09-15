// src/components/ProtectedRoute.js
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Do nothing while the session is loading
      return;
    }

    // Redirect to login page if not authenticated
    if (!session) {
      router.push("/login");
    } else if (allowedRoles && !allowedRoles.includes(session.user.role)) {
      // Redirect to unauthorized page if role is not allowed
      router.push("/unauthorized");
    }
  }, [session, status, router, allowedRoles]);

  // Show a loading state while authentication check is in progress
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  
  // Render children only if authenticated and authorized
  if (session && (!allowedRoles || allowedRoles.includes(session.user.role))) {
    return <>{children}</>;
  }
  
  // Fallback for when the user is not authorized, but redirection is still in progress
  return null; 
}