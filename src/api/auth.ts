import axios from 'axios';
import { handleApiError } from './client';
import type { OAuthResponse } from './types';

// Use base API URL for all requests
const API_URL = 'https://localhost:7091';

// Helper to build config with optional cookies (if needed)
function makeConfig(useCookies?: boolean) {
    // Only include withCredentials if needed
    return useCookies 
        ? { withCredentials: true, params: { useCookies } } 
        : { withCredentials: true };
}

// Log in using email and password
export const login = async (email: string, password: string, useCookies?: boolean) => {
    try {
        // Call /login endpoint using direct axios
        const response = await axios.post(
            `${API_URL}/login`,
            { email, password },
            makeConfig(useCookies)
        );
        return response.data;
    } catch (error) {
        handleApiError(error, 'logging in user');
        throw error;
    }
};

// Register a new user using basic info or with OAuth IDs
export const register = async (
    email: string,
    password: string,
    username: string,
    googleId?: string,
    facebookId?: string
) => {
    try {
        // Register endpoint with all possible fields
        const response = await axios.post(
            `${API_URL}/api/account/register`,
            { email, password, username, googleId, facebookId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, 'registering user');
        throw error;
    }
};

// Log out the user (server will clear session/cookie)
export const logout = async () => {
    try {
        // POST with empty body to logout endpoint
        const response = await axios.post(
            `${API_URL}/api/account/logout`,
            {},
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        handleApiError(error, 'logging out user');
        throw error;
    }
};

// Get Google OAuth login link or process
export const googleLogin = async (): Promise<OAuthResponse> => {
    try {
        // Start Google login OAuth flow
        const response = await axios.get(
            `${API_URL}/api/account/login/google`,
            { withCredentials: true }
        );
        return response.data as OAuthResponse;
    } catch (error) {
        handleApiError(error, 'Google login');
        throw error;
    }
};

// Get Google OAuth registration link or process
export const googleRegister = async (): Promise<OAuthResponse> => {
    try {
        // Start Google registration OAuth flow
        const response = await axios.get(
            `${API_URL}/api/account/register/google`,
            { withCredentials: true }
        );
        return response.data as OAuthResponse;
    } catch (error) {
        handleApiError(error, 'Google registration');
        throw error;
    }
};

// Sends an email to the user with a password reset link or token
export const ForgotPasswordEndpoint = async (
    email: string
) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/Account/forgot-password`,
            { email }
        );
        return response.data;
    } catch (error) {
        // This is for forgot-password, not registration
        console.error('Error processing password reset request:', error);
        throw error;
    }
};

// Resets the password using email and a code/token
export const ResetPasswordEndpoin = async (
    email: string,
    token: string,
    newPassword: string
) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/Account/reset-password`,
            { email, token, newPassword }
        );
        return response.data;
    } catch (error) {
        // This is for reset-password, not registration
        console.error('Error resetting the user password:', error);
        throw error;
    }
};
