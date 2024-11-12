import { Navigate } from "react-router-dom";
export default function ProtectedRoute(prop) {
    const { isUserDataLoading, element, isAdmin } = prop;

    const role = localStorage.getItem("role");

    if (isUserDataLoading) {
        return <div>Loading ...</div>;
    }

    if (isAdmin) {
        return role === "admin" ? element : <Navigate to="/login" />;
    }

    return role ? element : <Navigate to="/Login" />;
}
