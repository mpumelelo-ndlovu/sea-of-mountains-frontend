// FILE: src/utils/ProtectedRoute.jsx
// FINAL CORRECTED VERSION: Adds ARIA attributes for improved accessibility.

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    // While checking the user's session, display a full-page loading indicator.
    if (loading) {
        return (
            <div 
                className="flex justify-center items-center h-screen bg-gray-100"
                role="status" 
                aria-busy="true" 
                aria-live="polite"
            >
                <div className="text-center">
                    <span className="sr-only">Loading user session...</span>
                    <img src={logo} alt="Sea of Mountains Logo" className="h-20 w-auto mx-auto mb-4 animate-pulse" />
                    <ArrowPathIcon className="h-8 w-8 text-gray-500 animate-spin mx-auto" />
                </div>
            </div>
        );
    }

    // If the check is done and there's no user, redirect to the login page.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If the check is done and a user exists, render the protected page.
    return <Outlet />;
};

export default ProtectedRoute;