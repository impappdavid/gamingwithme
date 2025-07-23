import axios from 'axios';

export interface GoogleAuthResponse {
    authorizationUrl?: string;
    message?: string;
}

export interface FacebookAuthResponse {
    authorizationUrl?: string;
    message?: string;
}

export const login = async (
    email: string,
    password: string,
    useCookies?: boolean
)=> {
    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(
            `${API_URL}/login`,
            {
                email,
                password
            },
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true
            }
        );
        getUserCommonInfos()
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

export const getUserCommonInfos = async (
    useCookies?: boolean
) => {
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
        // Ensure response.data is typed to avoid 'unknown' type error
        return response.data as { id: string };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

export const Google = async (
): Promise<GoogleAuthResponse> => {
    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(
            `${API_URL}/api/account/login/google`
        );
        
        // Return the authorization URL from the backend
        return response.data as GoogleAuthResponse;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}



