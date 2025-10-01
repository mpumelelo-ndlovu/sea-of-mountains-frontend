// FILE: src/context/AuthContext.jsx
// FINAL REVISED VERSION: Implements a 20-minute idle timer with a warning modal.

import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toastError } from '../utils/toastService';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AuthContext = createContext();

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// --- NEW: Idle Timeout Modal Component ---
const IdleTimeoutModal = ({ onStay, onLogout, countdown }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-sm transform transition-all animate-fade-in-up">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <ExclamationTriangleIcon className="h-10 w-10 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">Are you still there?</h3>
            <p className="text-gray-600 mt-2 mb-6">
                You've been inactive for a while. For your security, you will be logged out in {countdown} seconds.
            </p>
            <div className="space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                    onClick={onLogout}
                    className="w-full sm:w-auto inline-block bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300"
                >
                    Logout
                </button>
                <button
                    onClick={onStay}
                    className="w-full sm:w-auto inline-block bg-ocean-blue text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                    I'm still here
                </button>
            </div>
        </div>
    </div>
);

// --- NEW: Custom Hook for Idle Timer ---
const useIdleTimer = (timeout, onIdle, onActive) => {
    const timeoutId = useRef();
    const warningTimeoutId = useRef();
    
    const startTimer = useCallback(() => {
        timeoutId.current = setTimeout(onIdle, timeout);
    }, [timeout, onIdle]);

    const resetTimer = useCallback(() => {
        clearTimeout(timeoutId.current);
        clearTimeout(warningTimeoutId.current);
        onActive();
        startTimer();
    }, [onActive, startTimer]);
    
    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'scroll'];
        events.forEach(event => window.addEventListener(event, resetTimer));
        startTimer();
        
        return () => {
            clearTimeout(timeoutId.current);
            clearTimeout(warningTimeoutId.current);
            events.forEach(event => window.removeEventListener(event, resetTimer));
        };
    }, [resetTimer, startTimer]);
    
    return { resetTimer };
};


export const AuthProvider = ({ children }) => {
    const getInitialState = () => {
        try {
            const authData = localStorage.getItem('authData');
            if (authData) {
                const parsedData = JSON.parse(authData);
                return { authTokens: parsedData.tokens, user: parsedData.user };
            }
        } catch (error) {
            console.error("Invalid auth data in localStorage, clearing it.", error);
            localStorage.removeItem('authData');
        }
        return { authTokens: null, user: null };
    };
    
    const initialState = getInitialState();
    const [authTokens, setAuthTokens] = useState(initialState.authTokens);
    const [user, setUser] = useState(initialState.user);
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // --- NEW: State for Idle Modal ---
    const [isIdleWarning, setIsIdleWarning] = useState(false);
    const [idleCountdown, setIdleCountdown] = useState(60);
    const countdownInterval = useRef();

    const logoutUser = useCallback(async () => {
        setAuthTokens(null);
        setUser(null);
        setDashboardData(null);
        localStorage.removeItem('authData');
        setIsIdleWarning(false);
        clearInterval(countdownInterval.current);
        navigate('/login');
    }, [navigate]);

    const handleIdle = useCallback(() => {
        setIsIdleWarning(true);
        setIdleCountdown(60);
        countdownInterval.current = setInterval(() => {
            setIdleCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownInterval.current);
                    logoutUser();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [logoutUser]);

    const handleActive = useCallback(() => {
        setIsIdleWarning(false);
        clearInterval(countdownInterval.current);
    }, []);

    const { resetTimer } = useIdleTimer(20 * 60 * 1000, handleIdle, handleActive); // 20 minutes

    const stayActive = () => {
        resetTimer();
        // Also a good idea to refresh the access token to ensure it's valid
        if (authTokens) {
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/token/refresh/`, {
                refresh: authTokens.refresh
            }).then(response => {
                const newTokens = { ...authTokens, access: response.data.access };
                const newAuthData = { tokens: newTokens, user: user };
                localStorage.setItem('authData', JSON.stringify(newAuthData));
                setAuthTokens(newTokens);
            }).catch(err => {
                console.error("Failed to refresh token on activity", err);
                logoutUser();
            });
        }
    };
    
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const currentData = localStorage.getItem('authData');
                if (currentData) {
                    const tokens = JSON.parse(currentData).tokens;
                    if (tokens?.access) {
                        config.headers.Authorization = `Bearer ${tokens.access}`;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;
            const currentData = localStorage.getItem('authData');
            
            if (error.response?.status === 401 && !originalRequest._retry && currentData) {
                originalRequest._retry = true;
                const tokens = JSON.parse(currentData).tokens;

                if (!tokens?.refresh) {
                    logoutUser();
                    return Promise.reject(error);
                }
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/token/refresh/`, { refresh: tokens.refresh });
                    const newTokens = { access: response.data.access, refresh: tokens.refresh };
                    const userDetails = jwtDecode(newTokens.access); // Assuming user details are needed from token
                    const newAuthData = { tokens: newTokens, user: { ...user, ...userDetails } };
                    
                    localStorage.setItem('authData', JSON.stringify(newAuthData));
                    setAuthTokens(newTokens);
                    setUser(newAuthData.user);
                    
                    originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error("Token refresh failed, logging out.", refreshError);
                    logoutUser();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        });

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [logoutUser]);
    
    const loginUser = async (email, password, recaptchaToken) => {
        try {
            const response = await api.post('/api/auth/login/', { email, password, recaptcha_token: recaptchaToken });
            const authData = {
                tokens: { access: response.data.access_token, refresh: response.data.refresh_token },
                user: response.data.user
            };
            if (!authData.tokens.access || !authData.user) throw new Error("Login response from server was incomplete.");
            
            localStorage.setItem('authData', JSON.stringify(authData));
            setAuthTokens(authData.tokens);
            setUser(authData.user);
            resetTimer(); // Start the idle timer on login
            navigate('/dashboard');
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.detail || 'Login failed. Please check your credentials.';
            return { success: false, message: errorMessage };
        }
    };
    
    const fetchDashboardData = useCallback(async () => {
        if (!authTokens) {
            setLoading(false);
            return;
        }
        setError(null);
        try {
            const response = await api.get('/api/student-dashboard/');
            setDashboardData(response.data);
        } catch (error) {
            console.error("Dashboard fetch failed:", error);
            if (error.response?.status !== 401) setError('Could not connect to the server to fetch your data.');
        } finally {
            if (loading) setLoading(false);
        }
    }, [authTokens, loading]);

    useEffect(() => {
        if (authTokens) fetchDashboardData();
        else setLoading(false);
    }, [authTokens, fetchDashboardData]);

    const generateStatement = async () => {
        // ... (existing generateStatement function)
    };

    const contextData = { user, loading, api, loginUser, logoutUser, generateStatement, dashboardData, error, hasApplication: dashboardData?.is_tenant || !!dashboardData?.application_details, fetchDashboardData };

    return (
        <AuthContext.Provider value={contextData}>
            {isIdleWarning && user && <IdleTimeoutModal onStay={stayActive} onLogout={logoutUser} countdown={idleCountdown} />}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;