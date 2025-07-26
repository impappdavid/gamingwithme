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

// Admin protected route
export function AdminProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await getUserCommonInfos();
        setIsAdmin(!!user && user.isAdmin === true);
      } catch {
        setIsAdmin(false);
      } finally {
        setLoading(false);
        setChecked(true);
      }
    };
    checkAdmin();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (checked && isAdmin) return <Outlet />;

  // Not admin, redirect to home
  return <Navigate to="/" replace />;
} 