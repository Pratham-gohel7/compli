import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login if no token found
        return <Navigate to="/" />;
    }

    // If there's a token, render the child route (protected page)
    return children;
};

export default PrivateRoute;
