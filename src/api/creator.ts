import { apiClient, createRequestConfig, handleApiError } from './client';

// Become a creator by creating Stripe connected account
export const becomeACreator = async (useCookies?: boolean) => {
    try {
        const response = await apiClient.post('/api/stripe/create-connected-account', {}, createRequestConfig(useCookies));
        return response;
    } catch (error) {
        console.error('Error creating connected account:', error);
        return null;
    }
};
