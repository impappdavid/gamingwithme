import axios from 'axios';

export type TopCreators = {
    id:number
    username: string
    avatarurl: string
    bio: string
    isActive: boolean
    languages: string[]
    games: string[]
    tags: string[]
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
export const GetRandomsByTagAndTop = async (
    tag: string,
    top: number
) => {

    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(
            // Pass tag and top as query parameters using the 'params' option
            `${API_URL}/api/user/profiles`,
            {
                params: {
                    tag,
                    top
                }
            }
        )
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}
