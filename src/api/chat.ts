import axios from 'axios';

// TODO: Replace with your actual API URL or use an environment variable
const API_URL = 'https://localhost:7091/api';

export const fetchConversation = async (receiverId: string) => {
    // The backend expects the current user from auth, but for testing, use receiverId as the other user
    const response = await axios.get(`${API_URL}/Message/conversation/${receiverId}`, {
        withCredentials: true
    });
    return response.data;
};

export const sendMessage = async (receiverId: string, content: string) => {
    const response = await axios.post(`${API_URL}/Message`, {
        receiverId,
        content
    }, {
        withCredentials: true,
        headers: {
            // Optionally, you could add a custom header to simulate sender if backend supports it
        }
    });
    return response.data;
};
