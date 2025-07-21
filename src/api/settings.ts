import { apiClient, createRequestConfig, handleApiError } from './client';
import type { UserCommonInfos, UserProfile, Bill } from './types';

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

// Get user's full profile information
export const getUserAllInformation = async (username: string): Promise<UserProfile> => {
    try {
        const response = await apiClient.get(`/api/user/profile/${username}`);
        return response.data as UserProfile;
    } catch (error) {
        handleApiError(error, 'fetching user information');
        throw error;
    }
};

// Update username
export const updateUsername = async (username: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.put('/api/user/username', { username }, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'updating username');
        throw error;
    }
};

// Update user bio
export const updateUserBio = async (bio: string, useCookies?: boolean): Promise<UserCommonInfos | null> => {
    try {
        const response = await apiClient.put('/api/user/bio', { bio }, createRequestConfig(useCookies));
        return response.data as UserCommonInfos;
    } catch (error) {
        console.error('Error updating user bio:', error);
        return null;
    }
};

// Update user password
export const updateUserPassword = async (currentPassword: string, newPassword: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.put('/api/user/password', {
            currentPassword,
            newPassword
        }, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'updating password');
        throw error;
    }
};

// Update user avatar
export const updateUserAvatar = async (file: File, useCookies?: boolean) => {
    try {
        const formData = new FormData();
        formData.append('avatarFile', file);

        const response = await apiClient.put('/api/user/avatar', formData, {
            ...createRequestConfig(useCookies),
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response;
    } catch (error) {
        console.error('Error updating user avatar:', error);
        return null;
    }
};

// Get upcoming bookings
export const getUpcomingBookings = async (useCookies?: boolean) => {
    try {
        const response = await apiClient.get('/api/user/upcoming-bookings', createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'fetching upcoming bookings');
        throw error;
    }
};

// Get billing history
export const getBills = async (useCookies?: boolean): Promise<Bill[]> => {
    try {
        const response = await apiClient.get('/api/user/billing-history', createRequestConfig(useCookies));
        return response.data as Bill[];
    } catch (error) {
        handleApiError(error, 'fetching billing history');
        throw error;
    }
};

// Delete account
export const deleteAccount = async (useCookies?: boolean) => {
    try {
        const response = await apiClient.delete('/api/account/delete', createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'deleting account');
        throw error;
    }
};

// Add game tag
export const addGameTag = async (gameName: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.post(`/api/user/games/${gameName}`, {}, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'adding game tag');
        throw error;
    }
};

// Delete game tag
export const deleteGameTag = async (gameName: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.delete(`/api/user/games/${gameName}`, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'deleting game tag');
        throw error;
    }
};

// Add new tag
export const addNewTag = async (tagName: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.post(`/api/user/tags/${tagName}`, {}, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'adding new tag');
        throw error;
    }
};

// Delete tag
export const deleteTag = async (tagId: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.delete(`/api/user/tags/${tagId}`, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'deleting tag');
        throw error;
    }
};

// Add user language
export const addUserLanguage = async (languageName: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.post(`/api/user/languages/${languageName}`, {}, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'adding user language');
        throw error;
    }
};

// Delete user language
export const deleteUserLanguage = async (languageName: string, useCookies?: boolean) => {
    try {
        const response = await apiClient.delete(`/api/user/languages/${languageName}`, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        handleApiError(error, 'deleting user language');
        throw error;
    }
};