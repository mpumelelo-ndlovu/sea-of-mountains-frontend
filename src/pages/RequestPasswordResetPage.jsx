// FILE: src/pages/RequestPasswordResetPage.jsx
// FINAL CORRECTED VERSION

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../context/AuthContext'; // <-- THE FIX
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import loginImage from '../assets/RNI-Films-IMG-47FBDCF7-FF4C-4598-A9E2-CE291410A47F.jpg';

function RequestPasswordResetPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const response = await api.post('/api/auth/password/reset/', { email }); // <-- THE FIX
            setMessage(response.data.detail);
        } catch (error) {
            // Avoid telling the user if the email exists or not for security
            setMessage("If an account with this email exists, a password reset link has been sent.");
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
                        <h2 className="text-3xl font-bold">Forgot Your Password?</h2>
                        <p className="text-base mt-2 opacity-90">No problem. Let's get you back on track.</p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-extrabold text-black mb-2">Reset Password</h2>
                    <p className="text-lg text-gray-600 mb-10">Enter your email to receive a reset link.</p>
                    {message ? (
                        <div className="p-4 bg-green-50 border border-green-400 text-green-700 rounded-lg flex items-center">
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            <span>{message}</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition"
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-white bg-ocean-blue hover:opacity-90 shadow-md transition-all duration-300 disabled:bg-gray-400"
                            >
                                {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                                {!isLoading && <EnvelopeIcon className="h-5 w-5 ml-2" />}
                            </button>
                        </form>
                    )}
                    <p className="text-center text-sm text-gray-600 mt-8">
                        Remember your password?{' '}
                        <Link to="/login" className="font-semibold text-[#9d6a51] hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RequestPasswordResetPage;