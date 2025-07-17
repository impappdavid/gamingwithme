import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserCommonInfos } from "@/api/navbar";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUserCommonInfos();
        setIsLoggedIn(!!user);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (isLoggedIn) return <Outlet />;

  // If already on login or registration, don't redirect again
  if (location.pathname === "/login" || location.pathname === "/registration") {
    return <Outlet />;
  }

  // Otherwise, redirect to login
  return <Navigate to="/login" replace />;
} 