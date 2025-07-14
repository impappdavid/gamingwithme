import axios from 'axios';

export const registration = async (
    email: string,
    password: string,
    username: string,
    googleId: string
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
