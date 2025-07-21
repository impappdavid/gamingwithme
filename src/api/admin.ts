import axios from "axios";

export interface GameInfos {
    id: string,
    name: string,
    description: string,
    slug: string,
    thumbnailUrl: string
}

export const GetAllGames = async (
    useCookies?: boolean
): Promise<GameInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/game`, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as GameInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const AddNewGame = async (
    name: string,
    description: string,
    slug: string,
    thumbnailUrl: string,
    useCookies?: boolean
): Promise<GameInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(`${API_URL}/api/game`,{
            name,
            description,
            slug,
            thumbnailUrl
        }, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as GameInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const getGameBySlug = async (slug: string) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/game/${slug}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching game by slug:', error);
        throw error;
    }
};

export const updateGame = async (game: { id: string, name: string, description: string, slug: string, thumbnailUrl: string }) => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.put(`${API_URL}/api/game/${game.id}`, game, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating game:', error);
        throw error;
    }
};

// NEWS
export const getGameNews = async (gameId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.get(`${API_URL}/api/GameNews`, {
        params: { gameId },
        withCredentials: true,
    });
    return response.data;
};

export const addGameNews = async (gameId: string, title: string, content: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.post(`${API_URL}/api/GameNews`, {
        title, content, gameId
    }, { withCredentials: true });
    return response.data;
};

export const getGameNewsById = async (newsId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.get(`${API_URL}/api/GameNews/${newsId}`, { withCredentials: true });
    return response.data;
};

export const deleteGameNews = async (newsId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.delete(`${API_URL}/api/GameNews/${newsId}`, { withCredentials: true });
    return response.data;
};

// EVENTS
export const getGameEvents = async (gameId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.get(`${API_URL}/api/games/${gameId}/events`, { withCredentials: true });
    return response.data;
};

export const addGameEvent = async (gameId: string, event: { title: string, startDate: string, endDate: string, prizePool: string, numberOfTeams: number, location: string }) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.post(`${API_URL}/api/games/${gameId}/events`, {
        ...event, gameId
    }, { withCredentials: true });
    return response.data;
};

export const deleteGameEvent = async (gameId: string, eventId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.delete(`${API_URL}/api/games/${gameId}/events/${eventId}`, { withCredentials: true });
    return response.data;
};

// EASTEREGGS
export const getGameEasterEggs = async (gameId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.get(`${API_URL}/api/games/${gameId}/easter-eggs`, { withCredentials: true });
    return response.data;
};

export const addGameEasterEgg = async (gameId: string, description: string, imageFile: File) => {
    const API_URL = 'https://localhost:7091';
    const formData = new FormData();
    formData.append('gameId', gameId);
    formData.append('description', description);
    formData.append('ImageFile', imageFile);
    const response = await axios.post(`${API_URL}/api/games/${gameId}/easter-eggs`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteGameEasterEgg = async (gameId: string, easterEggId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.delete(`${API_URL}/api/games/${gameId}/easter-eggs`, {
        params: { gameId, easterEggId },
        withCredentials: true,
    });
    return response.data;
};