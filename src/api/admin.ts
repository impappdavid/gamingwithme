import axios from "axios";

// Types for games and notifications
export interface GameInfos {
    id: string,
    name: string,
    description: string,
    slug: string,
    thumbnailUrl: string
}

export interface NotiInfos {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    isPublished: boolean
}

// Adds a new game and returns the list of all games
export const AddNewGame = async (
    name: string,
    description: string,
    slug: string,
    thumbnailUrl: string,
    useCookies?: boolean
): Promise<GameInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        // If useCookies is set, add it to params, otherwise pass empty object
        const response = await axios.post(`${API_URL}/api/game`, {
            name,
            description,
            slug,
            thumbnailUrl
        }, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        return response.data as GameInfos[];
    } catch (error) {
        // If there's an error, log it and return null
        console.error('Error fetching users:', error);
        return null;
    }
};

// Gets a game using its slug (unique string in URL)
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

// Updates all fields of a game. Expects a full game object.
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


// NEWS: Fetching, adding, deleting news for a game
export const getGameNews = async (gameId: string) => {
    const API_URL = 'https://localhost:7091';
    // Pass gameId as a parameter in the URL
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

export const deleteGameNews = async (newsId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.delete(`${API_URL}/api/GameNews/${newsId}`, { withCredentials: true });
    return response.data;
};

// EVENTS: Manage game events
export const getGameEvents = async (gameId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.get(`${API_URL}/api/games/${gameId}/events`, { withCredentials: true });
    return response.data;
};

export const addGameEvent = async (gameId: string, event: { title: string, startDate: string, endDate: string, prizePool: string, numberOfTeams: number, location: string }) => {
    const API_URL = 'https://localhost:7091';
    // Add all event data and the game id to the backend
    const response = await axios.post(`${API_URL}/api/games/${gameId}/events`, {
        ...event, gameId
    }, { withCredentials: true });
    return response.data;
};

export const deleteGameEvent = async (gameId: string, eventId: string) => {
    const API_URL = 'https://localhost:7091';
    // Delete a specific event by its id
    const response = await axios.delete(`${API_URL}/api/games/${gameId}/events/${eventId}`, { withCredentials: true });
    return response.data;
};


// EASTEREGGS: Manage hidden content for games
export const getGameEasterEggs = async (gameId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.get(`${API_URL}/api/games/${gameId}/easter-eggs`, { withCredentials: true });
    return response.data;
};

// Add an easter egg (hidden element), including an image file.
// Uses FormData because image uploading requires multipart/form-data.
export const addGameEasterEgg = async (gameId: string, description: string, imageFile: File) => {
    const API_URL = 'https://localhost:7091';
    const formData = new FormData();
    // Add all fields and the image file to form data for backend to handle
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
    // Backend expects both IDs as parameters
    const response = await axios.delete(`${API_URL}/api/games/${gameId}/easter-eggs`, {
        params: { gameId, easterEggId },
        withCredentials: true,
    });
    return response.data;
};


// NOTIFICATIONS: General notifications management
export const GetAllNotification = async (
    useCookies?: boolean
): Promise<NotiInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        // Fetch all notifications, optionally passing useCookies as a param
        const response = await axios.get(`${API_URL}/api/notifications/all`, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        return response.data as NotiInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const AddNewNotification = async (
    title: string,
    content: string,
    useCookies?: boolean
): Promise<NotiInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        // Post the new notification with title/content, optional cookies param
        const response = await axios.post(`${API_URL}/api/notifications`, {
            title,
            content,
        }, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        return response.data as NotiInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const DeleteNotification = async (
    notificationId: string,
    useCookies?: boolean
): Promise<NotiInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        // Delete a notification by its id, optional cookies param
        const response = await axios.delete(`${API_URL}/api/notifications/${notificationId}`, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        return response.data as NotiInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const PublishNotification = async (
    notificationId: string,
    useCookies?: boolean
) => {
    try {
        const API_URL = 'https://localhost:7091';
        // Publish a notification by sending PUT to a specific endpoint.
        // Backend might expect an empty object as body.
        const response = await axios.put(
            `${API_URL}/api/notifications/${notificationId}/publish`,
            {}, // Empty body
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error publishing notification:', error);
        return null;
    }
};
