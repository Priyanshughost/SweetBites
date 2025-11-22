import { Navigate } from "react-router-dom";

export default function PublicRoute({ element }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 
  const user = localStorage.getItem("user");

  // If user OR admin is logged in → block access to auth page
  if (token && (user || role === null || role === undefined || role)) {
    return <Navigate to="/" replace />;
  }

  return element;
}
