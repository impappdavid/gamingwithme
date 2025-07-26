import axios from 'axios';

export type TypeGames = {
    id:number
    name: string
    description: string
    slug: string
    thumbnailUrl: string
}

export const GetAllGames = async () => {
    try {
        // TODO: Replace with your actual API URL or use an environment variable
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(
            `${API_URL}/api/game`
        );
        return response.data;
    } catch (error) {
        console.error('Error getting all the games:', error);
        throw error;
    }
}

