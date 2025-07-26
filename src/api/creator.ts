import axios from 'axios';

// API base URL (consistent with your other files)
const API_URL = 'https://localhost:7091';

// Become a creator by creating a Stripe connected account
export const becomeACreator = async (useCookies?: boolean) => {
    try {
        // Make POST request to create connected account.
        // Sends empty body. Includes cookies if needed (for auth/session).
        const response = await axios.post(
            `${API_URL}/api/stripe/create-connected-account`,
            {},
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        console.error('Error creating connected account:', error);
        return null;
    }
};
