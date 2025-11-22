import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // admin = undefined

  // ADMIN ACCESS (fixed parentheses)
  if (token && (role === null || role === undefined)) {
    return element;
  }

  // USER trying to enter ADMIN route → kick them out
  if (token && role) {
    return <Navigate to="/" />;
  }

  // NOT LOGGED IN AT ALL → go admin login
  return <Navigate to="/admin/login" replace />;
}
