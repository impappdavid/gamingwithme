import axios from "axios";

export interface UserCommonInfos {
    id: string;
    username: string;
    isAdmin: boolean;
}

export interface Notification {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    isPublished: boolean;
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

export const getNotifications = async (
    isPublished: true
): Promise<Notification> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/notifications`, {
            params: { isPublished },
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as Notification;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw new Error;
    }
};