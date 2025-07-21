import { apiClient, createRequestConfig, handleApiError } from './client';
import type { UserCommonInfos, UserProfile, UserProfileWithTags } from './types';

// Get current user's basic info
export const getUserCommonInfos = async (useCookies?: boolean): Promise<UserCommonInfos | null> => {
    try {
        const response = await apiClient.get('/api/user/me', createRequestConfig(useCookies));
        return response.data as UserCommonInfos;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
};

// Get specific user's full profile
export const getUserProfile = async (username: string, useCookies?: boolean): Promise<UserProfile> => {
    try {
        const response = await apiClient.get(
            `/api/user/profile/${encodeURIComponent(username)}`,
            createRequestConfig(useCookies)
        );
        return response.data as UserProfile;
    } catch (error) {
        handleApiError(error, 'fetching user profile');
        throw error; // Re-throw after handling
    }
};

// Get all users
export const getAllUsers = async (
    useCookies?: boolean
): Promise<UserProfileWithTags[]> => {
    try {
        const response = await apiClient.get('/api/user/profiles', createRequestConfig(useCookies));
        return response.data as UserProfileWithTags[];
    } catch (error) {
        handleApiError(error, 'fetching all users');
        throw error; // Re-throw after handling
    }
};

// Get users by tag
export const getUsersByTag = async (
    tag: "Youtube" | "Tiktok" | "Just chatting" | "Musician" | "Gamer",
    useCookies?: boolean
): Promise<UserProfileWithTags[] | null> => {
    try {
        const response = await apiClient.get('/api/user/profiles', {
            ...createRequestConfig(useCookies),
            params: { tag, ...createRequestConfig(useCookies).params }
        });
        return response.data as UserProfileWithTags[];
    } catch (error) {
        console.error('Error fetching users by tag:', error);
        return null;
    }
};

// Get top creators by bookings
export const getTopCreators = async (): Promise<UserProfile[]> => {
    try {
        const response = await apiClient.get('/api/user/top-by-bookings');
        return response.data as UserProfile[];
    } catch (error) {
        handleApiError(error, 'fetching top creators');
        throw error; // Re-throw after handling
    }
};

// Get suggested users with connected payment
export const getSuggestedUsersWithPayment = async (): Promise<UserProfile[]> => {
    try {
        const response = await apiClient.get('/api/user/random-with-stripe');
        return response.data as UserProfile[];
    } catch (error) {
        handleApiError(error, 'fetching suggested users');
        throw error; // Re-throw after handling
    }
}; 