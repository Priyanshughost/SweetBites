import { Navigate } from 'react-router-dom';

export default function UserProtected({ element }) {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // user = some string, admin = undefined

    // USER ACCESS:
    if (user && token && role !== null && role !== undefined) {
        return element;
    }

    return <Navigate to="/user/auth" replace />;
}
