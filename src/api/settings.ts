import axios from "axios";

export interface UserCommonInfos {
    id: string;
    username: string;
}

export type UserAllInfo = {
    id: number
    username: string
    avatarurl: string
    bio: string
    isActive: boolean
    languages: string[]
    games: string[]
    hasStripeAccount: boolean
    bookings: {
        id: string,
        startTime: Date,
        duration: string,
        customerName: string
    }[]
    availability: {
        id: string,
        date: Date,
        startTime: string,
        endTime: string,
        isAvailable: boolean
    }[]
    joined: string
}

export const GetUserAllInformation = async (
    username: string
) => {
    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(
            `${API_URL}/api/user/profile/${username}`
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
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

export const UpdateUsername = async (
    username: string,
    useCookies?: boolean
) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.put(`${API_URL}/api/user/username`,
            {
                username
            },
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

export const UpdateUserBio = async (
    bio: string,
    useCookies?: boolean
): Promise<UserCommonInfos | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.put(`${API_URL}/api/user/bio`,
            {
                bio
            },
            {
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

export const UpdateUserPassword = async (
    currentPassword: string,
    newPassword: string,
    useCookies?: boolean
) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.put(`${API_URL}/api/user/password`,
            {
                currentPassword,
                newPassword
            },
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

export const UpdateUserAvatar = async (
    avatarFile: { $binary: string },
    useCookies?: boolean
) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.put(`${API_URL}/api/user/avatar`,
            {
                avatarFile
            },
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

export const getUpcomingBookings = async (
    useCookies?: boolean
) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/user/upcoming-bookings`, {
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

export const getBills = async (
    useCookies?: boolean
) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/user/billing-history`, {
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

export const DeleteAccount = async (
    useCookies?: boolean
) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.delete(`${API_URL}/api/account/delete`, {
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

