import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';

const AdminRoute = () => {
    const { user, loading } = useAuth();

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

    if (!user || !user.is_staff) {
        // Redirect non-staff users to the home page
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default AdminRoute;
