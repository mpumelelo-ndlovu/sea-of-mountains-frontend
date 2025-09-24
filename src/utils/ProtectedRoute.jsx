// FILE: src/utils/ProtectedRoute.jsx
// FINAL CORRECTED VERSION: Removes the dependency on the deleted AdminLayout.

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    // While checking user status, don't render anything to prevent flashes of content
    if (loading) {
        return null;
    }

    // If the check is done and there's no user, redirect to the login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If the user is logged in, render the child page (e.g., DashboardPage)
    return <Outlet />;
};

export default ProtectedRoute;