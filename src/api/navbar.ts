import axios from "axios";

export interface UserCommonInfos {
    id: string;
    username: string;
}

export const getUserCommonInfos = async (
    useCookies?: boolean
): Promise<UserCommonInfos | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/user/me`, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as UserCommonInfos;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
};

export const Logout = async () => {
    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(
            `${API_URL}/api/account/logout`,
            {}, // empty body
            {
                withCredentials: true // ✅ VERY IMPORTANT!
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}
