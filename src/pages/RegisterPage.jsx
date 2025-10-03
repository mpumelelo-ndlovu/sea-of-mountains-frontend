// FILE: src/pages/RegisterPage.jsx
// REVISED: Programmatically resets the reCAPTCHA on a failed submission attempt.

import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { api } from '../context/AuthContext';
import { ArrowRightIcon, ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import loginImage from '../assets/RNI-Films-IMG-47FBDCF7-FF4C-4598-A9E2-CE291410A47F.webp';

function RegisterPage() {
    const navigate = useNavigate();
    const recaptchaRef = useRef(null); // Create a ref for the ReCAPTCHA component
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        password2: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.password2) {
            setError("Passwords do not match.");
            setIsLoading(false);
            recaptchaRef.current.reset(); // Reset reCAPTCHA
            setRecaptchaToken(null); // Clear token state
            return;
        }

        if (!recaptchaToken) {
            setError('Please complete the reCAPTCHA.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post('/api/auth/registration/', {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone_number: formData.phone_number,
                password: formData.password,
                recaptcha_token: recaptchaToken,
            });

            if (response.status === 201) {
                navigate('/login', { state: { message: "Registration successful! Please log in." } });
            }
        } catch (err) {
            console.error("Registration Error:", err.response);
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                const errorMessages = Object.values(errorData).flat();
                setError(errorMessages.length > 0 ? errorMessages : 'An unknown registration error occurred.');
            } else {
                setError('An unknown error occurred. Please try again.');
            }
            recaptchaRef.current.reset(); // Reset reCAPTCHA on API error
            setRecaptchaToken(null); // Clear token state
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
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-8">
                    <div className="text-center text-white">
                        <h2 className="text-3xl font-bold">Join Our Community</h2>
                        <p className="text-base mt-2 opacity-90">Create an account to begin your journey with us.</p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <h2 className="text-4xl font-extrabold text-black mb-2">Create Your Account</h2>
                    <p className="text-lg text-gray-600 mb-10">Let's get you started.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
                            <div className="w-full">
                                <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="first_name">First Name</label>
                                <input className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition" id="first_name" name="first_name" type="text" placeholder="John" onChange={handleChange} required />
                            </div>
                            <div className="w-full">
                                <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="last_name">Last Name</label>
                                <input className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition" id="last_name" name="last_name" type="text" placeholder="Doe" onChange={handleChange} required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="email">Email Address</label>
                            <input className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition" id="email" name="email" type="email" placeholder="your@example.com" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="phone_number">Phone Number</label>
                            <input className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition" id="phone_number" name="phone_number" type="tel" placeholder="+27123456789" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition pr-10"
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••"
                                    onChange={handleChange}
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
                            <ul className="text-xs text-gray-500 mt-2 list-disc list-inside">
                                <li>At least 8 characters long</li>
                                <li>Contains at least one uppercase letter</li>
                                <li>Contains at least one symbol (e.g., !@#$%)</li>
                                <li>Cannot be too similar to your name or email</li>
                            </ul>
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="password2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition pr-10"
                                    id="password2"
                                    name="password2"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••"
                                    onChange={handleChange}
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
                                ref={recaptchaRef} // Attach the ref here
                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                onChange={(token) => setRecaptchaToken(token)}
                                onExpired={() => setRecaptchaToken(null)}
                            />
                        </div>
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-400 text-red-600 rounded-lg flex items-start">
                                <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                {Array.isArray(error) ? (
                                    <ul className="list-disc list-inside">
                                        {error.map((msg, index) => (
                                            <li key={index}>{msg}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>{error}</span>
                                )}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading || !recaptchaToken}
                            className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-white bg-ocean-blue hover:opacity-90 shadow-md transition-all duration-300 disabled:bg-gray-400"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                            {!isLoading && <ArrowRightIcon className="h-5 w-5 ml-2" />}
                        </button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-[#9d6a51] hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;