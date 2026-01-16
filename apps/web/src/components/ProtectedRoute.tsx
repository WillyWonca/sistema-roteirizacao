import { Navigate, Outlet } from "react-router-dom";

function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function ProtectedRoute() {
  if (!isTokenValid()) {
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
