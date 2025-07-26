import axios from 'axios';

export interface GoogleAuthResponse {
    authorizationUrl?: string;
    message?: string;
}



export const registration = async (
    email: string,
    password: string,
    username: string,
    googleId?: string,
) => {
    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(
            `${API_URL}/api/account/register`,
            {
                email,
                password,
                username,
                googleId
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error registrating the user:', error);
        throw error;
    }
}

export const GoogleRegistration = async (
): Promise<GoogleAuthResponse> => {
    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(
            `${API_URL}/api/account/register/google`
        );
        
        // Return the authorization URL from the backend
        return response.data as GoogleAuthResponse;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}


