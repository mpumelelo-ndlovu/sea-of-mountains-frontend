// FILE: src/context/AuthContext.jsx
// FINAL CORRECTED VERSION: Fixes the user state to correctly display the user's name.

import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toastError } from '../utils/toastService';

const AuthContext = createContext();

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const AuthProvider = ({ children }) => {
    // This function safely initializes state from localStorage.
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

    const logoutUser = useCallback(async () => {
        setAuthTokens(null);
        setUser(null);
        setDashboardData(null);
        localStorage.removeItem('authData');
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const currentTokens = authTokens;
                if (currentTokens?.access) {
                    config.headers.Authorization = `Bearer ${currentTokens.access}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    if (!authTokens?.refresh) {
                        logoutUser();
                        return Promise.reject(error);
                    }

                    try {
                        const refreshResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/token/refresh/`, {
                            refresh: authTokens.refresh
                        });

                        const newTokens = {
                            access: refreshResponse.data.access,
                            refresh: authTokens.refresh
                        };
                        
                        // Also fetch the user details again after refreshing the token
                        const userResponse = await api.get('/api/auth/user/', {
                            headers: { Authorization: `Bearer ${newTokens.access}` }
                        });

                        const newAuthData = { tokens: newTokens, user: userResponse.data };
                        localStorage.setItem('authData', JSON.stringify(newAuthData));
                        setAuthTokens(newTokens);
                        setUser(userResponse.data);
                        
                        originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
                        return api(originalRequest);
                        
                    } catch (refreshError) {
                        console.error("Token refresh failed, logging out.", refreshError);
                        logoutUser();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [authTokens, logoutUser]);
    
    const loginUser = async (email, password, recaptchaToken) => {
        try {
            const response = await api.post('/api/auth/login/', { email, password, recaptcha_token: recaptchaToken });
            
            // --- THIS IS THE FIX ---
            // We now store the full user object along with the tokens.
            const authData = {
                tokens: {
                    access: response.data.access_token,
                    refresh: response.data.refresh_token,
                },
                user: response.data.user
            };

            if (!authData.tokens.access || !authData.user) {
                throw new Error("Login response from server was incomplete.");
            }

            localStorage.setItem('authData', JSON.stringify(authData));
            setAuthTokens(authData.tokens);
            setUser(authData.user);
            
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
            if (error.response?.status !== 401) {
                setError('Could not connect to the server to fetch your data.');
            }
        } finally {
            if (loading) setLoading(false);
        }
    }, [authTokens, loading]);

    useEffect(() => {
        if (authTokens) {
            fetchDashboardData();
        } else {
            setLoading(false);
        }
    }, [authTokens, fetchDashboardData]);

    const generateStatement = async () => {
        try {
            const response = await api.get('/api/tenant/download-statement/', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'statement.pdf';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch && fileNameMatch.length === 2) fileName = fileNameMatch[1];
            }
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            return { success: true };
        } catch (error) {
            console.error("Statement download failed:", error);
            toastError('Could not download the statement. Please try again later.');
            return { success: false, message: 'Could not download the statement. Please try again later.' };
        }
    };

    const contextData = {
        user,
        loading,
        api,
        loginUser,
        logoutUser,
        generateStatement,
        dashboardData,
        error,
        hasApplication: dashboardData?.is_tenant || !!dashboardData?.application_details,
        fetchDashboardData,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;