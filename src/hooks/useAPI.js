// src/hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Custom hook for API calls with caching and error handling
 */
export const useApi = (endpoint, options = {}) => {
    const { api } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const {
        method = 'GET',
        body = null,
        dependencies = [],
        cache = true,
        cacheTime = 5 * 60 * 1000, // 5 minutes default
    } = options;

    const fetchData = useCallback(async () => {
        // Check cache first
        if (cache && method === 'GET') {
            const cacheKey = `api_cache_${endpoint}`;
            const cachedData = sessionStorage.getItem(cacheKey);
            if (cachedData) {
                const parsed = JSON.parse(cachedData);
                if (Date.now() - parsed.timestamp < cacheTime) {
                    setData(parsed.data);
                    setLoading(false);
                    return;
                }
            }
        }

        setLoading(true);
        setError(null);
        
        try {
            const config = {
                method,
                url: endpoint,
            };
            
            if (body) {
                config.data = body;
            }
            
            const response = await api(config);
            setData(response.data);
            
            // Cache the response
            if (cache && method === 'GET') {
                const cacheKey = `api_cache_${endpoint}`;
                sessionStorage.setItem(cacheKey, JSON.stringify({
                    data: response.data,
                    timestamp: Date.now()
                }));
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred');
            console.error(`API Error (${endpoint}):`, err);
        } finally {
            setLoading(false);
        }
    }, [api, endpoint, method, body, cache, cacheTime]);

    useEffect(() => {
        fetchData();
    }, [fetchData, ...dependencies]);

    const refetch = useCallback(() => {
        // Clear cache for this endpoint
        if (cache) {
            const cacheKey = `api_cache_${endpoint}`;
            sessionStorage.removeItem(cacheKey);
        }
        fetchData();
    }, [fetchData, cache, endpoint]);

    return { data, loading, error, refetch };
};