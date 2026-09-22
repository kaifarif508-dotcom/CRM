import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";

const ProtectedRoute = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const checkAuth = async () => {

            try {

                await api.get("/auth/me");

                setIsAuthenticated(true);

            } catch (error) {
console.log(error)
                setIsAuthenticated(false);

            } finally {

                setLoading(false);
            }
        };

        checkAuth();

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;