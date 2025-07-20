import axios from 'axios';
import { API_BASE_URL } from './types';

// Create axios instance with default configuration
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Helper function to create request config with optional cookies parameter
export const createRequestConfig = (useCookies?: boolean) => ({
    params: useCookies !== undefined ? { useCookies } : {},
    withCredentials: true,
});

// Helper function to handle API errors consistently
export const handleApiError = (error: any, operation: string) => {
    console.error(`Error ${operation}:`, error);
    throw error;
}; 