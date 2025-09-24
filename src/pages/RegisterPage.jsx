// FILE: src/pages/RegisterPage.jsx
// FINAL CORRECTED VERSION: Points to the correct /registration/ API endpoint.

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { api } from '../context/AuthContext';
import { ArrowRightIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import loginImage from '../assets/RNI-Films-IMG-47FBDCF7-FF4C-4598-A9E2-CE291410A47F.jpg';

function RegisterPage() {
    const navigate = useNavigate();
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
            return;
        }

        if (!recaptchaToken) {
            setError('Please complete the reCAPTCHA.');
            setIsLoading(false);
            return;
        }

        try {
            // --- THIS IS THE FIX ---
            // The URL is now '/api/auth/registration/' which matches the backend urls.py
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
                setError(errorMessages[0] || 'An unknown registration error occurred.');
            } else {
                setError('An unknown error occurred. Please try again.');
            }
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
                            <input className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition" id="email" name="email" type="email" placeholder="your@email.com" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="phone_number">Phone Number</label>
                            <input className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition" id="phone_number" name="phone_number" type="tel" placeholder="+27123456789" onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="password">Password</label>
                            <input className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition" id="password" name="password" type="password" placeholder="••••••••••" onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-800 mb-2" htmlFor="password2">Confirm Password</label>
                            <input className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue shadow-sm transition" id="password2" name="password2" type="password" placeholder="••••••••••" onChange={handleChange} required />
                        </div>
                         <div className="flex justify-center">
                            <ReCAPTCHA
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