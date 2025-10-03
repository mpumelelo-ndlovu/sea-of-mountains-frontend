// FILE: src/pages/ResetPasswordPage.jsx
// FINAL CORRECTED VERSION

import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../context/AuthContext'; // <-- THE FIX
import { KeyIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import loginImage from '../assets/RNI-Films-IMG-47FBDCF7-FF4C-4598-A9E2-CE291410A47F.webp';

function ResetPasswordPage() {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        if (password !== password2) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post('/api/auth/password/reset/confirm/', { // <-- THE FIX
                new_password1: password,
                new_password2: password2,
                uid: uidb64,
                token
            });
            if (response.status === 200) {
                setSuccessMessage(response.data.detail + " You will be redirected to the login page shortly.");
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (err) {
            setError(err.response?.data?.detail || "An error occurred. The link may be invalid or expired.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden lg:block w-1/2 relative">
                <img
                    src={loginImage}
                    alt="Sea of Mountains accommodation"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                        <h2 className="text-3xl font-bold">Set a New Password</h2>
                        <p className="text-base mt-2 opacity-90">Secure your account with a new, strong password.</p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-extrabold text-black mb-2">Create New Password</h2>
                    <p className="text-lg text-gray-600 mb-10">Please enter and confirm your new password.</p>
                    {successMessage ? (
                         <div className="p-4 bg-green-50 border border-green-400 text-green-700 rounded-lg flex items-center">
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            <span>{successMessage}</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="password">
                                    New Password
                                </label>
                                <input
                                    className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                             <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="password2">
                                    Confirm New Password
                                </label>
                                <input
                                    className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition"
                                    id="password2"
                                    type="password"
                                    placeholder="••••••••••"
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    required
                                />
                            </div>
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-400 text-red-600 rounded-lg flex items-center">
                                    <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                                    <span>{error}</span>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-white bg-ocean-blue hover:opacity-90 shadow-md transition-all duration-300 disabled:bg-gray-400"
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                                {!isLoading && <KeyIcon className="h-5 w-5 ml-2" />}
                            </button>
                        </form>
                    )}
                    <p className="text-center text-sm text-gray-600 mt-8">
                        Return to{' '}
                        <Link to="/login" className="font-semibold text-[#9d6a51] hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;