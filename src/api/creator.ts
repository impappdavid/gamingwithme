import axios from "axios";

export const BecomeACreator = async (
    useCookies?: boolean
) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(`${API_URL}/api/stripe/create-connected-account`,
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true,
            });

        // ✅ RETURN the result!
        return response;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
};
