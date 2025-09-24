// FILE: src/context/AuthContext.jsx
// FINAL CORRECTED VERSION: Ensures axios uses the production API URL.

import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toastError } from '../utils/toastService';

const AuthContext = createContext();

// This is the crucial fix: The API client is now explicitly configured
// to use the base URL from the environment variables you set on Netlify.
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            try {
                await api.get('/api/csrf-token/');
                const userResponse = await api.get('/api/auth/user/');
                setUser(userResponse.data);
                const dashboardResponse = await api.get('/api/student-dashboard/');
                setDashboardData(dashboardResponse.data);
            } catch (error) {
                console.log("No valid session found on initial load.");
                setUser(null);
                setDashboardData(null);
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, []);

    const loginUser = async (email, password, recaptchaToken) => {
        try {
            const response = await api.post('/api/auth/login/', { email, password, recaptcha_token: recaptchaToken });
            setUser(response.data.user);
            await fetchDashboardData(response.data.user);
            navigate('/dashboard');
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.non_field_errors?.[0] || 'Login failed. Please check your credentials.';
            return { success: false, message: errorMessage };
        }
    };

    const logoutUser = useCallback(async () => {
        setUser(null);
        setDashboardData(null);
        try {
            await api.post('/api/auth/logout/');
        } catch (error) {
            console.error("Logout API call failed.", error);
        }
        navigate('/login');
    }, [navigate]);

    const fetchDashboardData = useCallback(async (currentUser) => {
        const userToFetch = currentUser || user;
        if (!userToFetch) return;
        setError(null);
        try {
            const response = await api.get('/api/student-dashboard/');
            setDashboardData(response.data);
        } catch (error) {
            console.error("Dashboard fetch failed:", error);
            setError('Could not connect to the server to fetch your data.');
            if (error.response?.status === 401 || error.response?.status === 403) {
                if(user) logoutUser();
            }
        }
    }, [user, logoutUser]);

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
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;