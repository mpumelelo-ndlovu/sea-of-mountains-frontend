// FILE: src/utils/ApplicationRouteGuard.jsx
// FINAL CORRECTED VERSION

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';

const ApplicationRouteGuard = ({ children }) => {
    const { user, loading, hasApplication } = useAuth();
    const location = useLocation();

    // If the initial authentication check is still running, show a full-page loader.
    // This is the crucial step that prevents any premature redirects.
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                    <img src={logo} alt="Sea of Mountains Logo" className="h-20 w-auto mx-auto mb-4 animate-pulse" />
                    <ArrowPathIcon className="h-8 w-8 text-gray-500 animate-spin mx-auto" />
                </div>
            </div>
        );
    }

    // Once loading is complete, check for the user. If they aren't logged in,
    // redirect them to the login page, but remember where they were trying to go.
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    // If the user is logged in AND they already have an application, redirect
    // them to their dashboard to prevent them from applying again.
    if (hasApplication) {
        return <Navigate to="/dashboard" state={{ message: "You have already submitted an application." }} replace />;
    }

    // If all checks pass (user is loaded, logged in, and has no application),
    // then render the children, which is the ApplicationPage.
    return children;
};

export default ApplicationRouteGuard;