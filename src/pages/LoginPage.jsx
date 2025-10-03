// FILE: src/pages/LoginPage.jsx
// REVISED: Adds show password toggle, reCAPTCHA reset on error, and improves link visibility.

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { ArrowRightIcon, ExclamationCircleIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import loginImage from '../assets/RNI-Films-IMG-47FBDCF7-FF4C-4598-A9E2-CE291410A47F.webp';

function LoginPage() {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const recaptchaRef = useRef(null); // Create a ref for the ReCAPTCHA component

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
            // Clear the message from location state so it doesn't reappear on refresh
            navigate(location.pathname, { state: {}, replace: true });
        }
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        if (!recaptchaToken) {
            setError('Please complete the reCAPTCHA.');
            setIsLoading(false);
            return;
        }

        const result = await loginUser(email, password, recaptchaToken);
        if (!result.success) {
            setError(result.message);
            recaptchaRef.current.reset(); // Reset reCAPTCHA on error
            setRecaptchaToken(null); // Clear the token state
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex">
            
            <div className="hidden lg:block w-1/2 relative">
                <img 
                    src={loginImage} 
                    alt="Sea of Mountains accommodation" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                        <h2 className="text-3xl font-bold">Sea of Mountains</h2>
                        <p className="text-base mt-2 opacity-90">Modernized student living, redefined.</p>
                    </div>
                </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-extrabold text-black mb-2">Welcome Back</h2>
                    <p className="text-lg text-gray-600 mb-10">Sign in to continue your journey.</p>

                    {successMessage && (
                        <div className="p-4 mb-6 bg-green-50 border border-green-400 text-green-700 rounded-lg flex items-center">
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            <span>{successMessage}</span>
                        </div>
                    )}

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

                        <div>
                            <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition pr-10"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <ReCAPTCHA
                                ref={recaptchaRef} // Attach the ref
                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                onChange={(token) => setRecaptchaToken(token)}
                                onExpired={() => setRecaptchaToken(null)}
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
                            disabled={isLoading || !recaptchaToken}
                            className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-white bg-ocean-blue hover:opacity-90 shadow-md transition-all duration-300 disabled:bg-gray-400"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                            {!isLoading && <ArrowRightIcon className="h-5 w-5 ml-2" />}
                        </button>

                        <div className="flex items-center justify-between mt-8">
                            <Link
                                to="/request-password-reset"
                                className="text-base font-semibold text-ocean-blue hover:underline"
                            >
                                Forgot Password?
                            </Link>
                            <p className="text-base text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-bold text-[#9d6a51] hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;