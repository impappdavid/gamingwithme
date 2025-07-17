import axios from "axios";

export interface UserInfos {
    id: string,
    username: string,
    avatarurl: string,
    bio: string,
    isActive: boolean,
    languages: string[],
    games: string[],
    tags: string[],
    hasStripeAccount: boolean,
    availability: string[],
    joined: Date
}

export const GetAllUser = async (
    useCookies?: boolean
): Promise<UserInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/user/profiles`, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as UserInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const GetByTag = async (
    tag: "youtube" | "tiktok" | "just-chatting" | "music",
    useCookies?: boolean
): Promise<UserInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/user/profiles`, {
            params: { tag, ...(useCookies !== undefined ? { useCookies } : {}) },
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as UserInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

