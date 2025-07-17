import axios from "axios";

// Define the type for the user profile response
export type UserInfos = {
    id:number
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
        id:string,
        date: Date,
        startTime: string,
        endTime: string,
        isAvailable: boolean
    }[]
    joined: string
}

export const IsLoggedIn = async (useCookies?: boolean) => {
    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(
            `${API_URL}/api/user/me`,
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}



export const GetUserInfos = async (username: string, useCookies?: boolean): Promise<UserInfos> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(
            `${API_URL}/api/user/profile/${encodeURIComponent(username)}`,
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true
            }
        );
        // Ensure the response data is of type UserInfos
        return response.data as UserInfos;
    } catch (error: any) {
        console.error('Error fetching user profile:', error);
        // Optionally, you could throw a more descriptive error or handle specific error cases here
        throw error;
    }
};

export const GetAllUser = async (): Promise<UserInfos> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(
            `${API_URL}/api/user/profiles`,
        );
        // Ensure the response data is of type UserInfos
        return response.data as UserInfos;
    } catch (error: any) {
        console.error('Error fetching user profile:', error);
        // Optionally, you could throw a more descriptive error or handle specific error cases here
        throw error;
    }
};

