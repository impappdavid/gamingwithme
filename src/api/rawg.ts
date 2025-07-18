// src/api/rawg.ts
import axios from 'axios';

const API_BASE_URL = 'https://corsproxy.io/?https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

console.log('RAWG API KEY:', API_KEY);

export interface Game {
  name: string;
  released: string;
  background_image: string;
  rating: number;
}

export const fetchGame = async (title: string): Promise<Game | null> => {
  try {
    const url = `${API_BASE_URL}/games?search=${encodeURIComponent(title)}&key=${API_KEY}`;
    const response = await axios.get(url) as { data: { results: Game[] } };

    const game = (response.data && Array.isArray(response.data.results)) ? response.data.results[0] : null;
    return game || null;
  } catch (error) {
    console.error('Error fetching game:', error);
    return null;
  }
};

export const fetchPopularGames = async (pageSize = 40): Promise<Game[]> => {
  try {
    const url = `${API_BASE_URL}/games?key=${API_KEY}&page_size=${pageSize}`;
    console.log("This is the url",url)
    const response = await axios.get(url) as { data: { results: Game[] } };
    return response.data.results || [];
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};