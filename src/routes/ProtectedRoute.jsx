import React from 'react'

function ProtectedRoute({ element }) {
  const isAuth = localStorage.getItem("authToken");
  return isAuth ? element : <div>Access Denied</div>;
}

export default ProtectedRoute