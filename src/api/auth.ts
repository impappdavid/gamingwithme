import { apiClient, createRequestConfig, handleApiError } from './client';
import type { OAuthResponse } from './types';

// Login with email and password
export const login = async (email: string, password: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.post('/login', { email, password }, createRequestConfig(useCookies));
        return response.data;
    } catch (error) {
        handleApiError(error, 'logging in user');
        throw error; // Re-throw after handling
    }
};

// Register new user
export const register = async (email: string, password: string, username: string, googleId?: string, facebookId?: string) => {
    try {
        const response = await apiClient.post('/api/account/register', {
            email,
            password,
            username,
            googleId,
            facebookId
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'registering user');
        throw error; // Re-throw after handling
    }
};

// Logout user
export const logout = async () => {
    try {
        const response = await apiClient.post('/api/account/logout', {});
        return response.data;
    } catch (error) {
        handleApiError(error, 'logging out user');
        throw error; // Re-throw after handling
    }
};

// Google OAuth for login
export const googleLogin = async (): Promise<OAuthResponse> => {
    try {
        const response = await apiClient.get('/api/account/login/google');
        return response.data as OAuthResponse;
    } catch (error) {
        handleApiError(error, 'Google login');
        throw error; // Re-throw after handling
    }
};



// Google OAuth for registration
export const googleRegister = async (): Promise<OAuthResponse> => {
    try {
        const response = await apiClient.get('/api/account/register/google');
        return response.data as OAuthResponse;
    } catch (error) {
        handleApiError(error, 'Google registration');
        throw error; // Re-throw after handling
    }
};
