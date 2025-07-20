import { apiClient, handleApiError } from './client';
import type { Game, RAWGGame } from './types';

// Get all games from your backend
export const getAllGames = async (): Promise<Game[]> => {
    try {
        const response = await apiClient.get('/api/game');
        return response.data as Game[];
    } catch (error) {
        handleApiError(error, 'fetching all games');
        throw error; // Re-throw after handling
    }
};

// Fetch game from RAWG API
export const fetchGameFromRAWG = async (title: string): Promise<RAWGGame | null> => {
    try {
        const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
        const url = `https://corsproxy.io/?https://api.rawg.io/api/games?search=${encodeURIComponent(title)}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        const game = (data && Array.isArray(data.results)) ? data.results[0] : null;
        return game || null;
    } catch (error) {
        console.error('Error fetching game from RAWG:', error);
        return null;
    }
};

// Fetch popular games from RAWG API
export const fetchPopularGamesFromRAWG = async (pageSize = 40): Promise<RAWGGame[]> => {
    try {
        const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
        const url = `https://corsproxy.io/?https://api.rawg.io/api/games?key=${API_KEY}&page_size=${pageSize}`;
        const response = await fetch(url);
        const data = await response.json();
        
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular games from RAWG:', error);
        return [];
    }
}; 