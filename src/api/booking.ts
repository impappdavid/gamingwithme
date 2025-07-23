import axios from "axios";

export interface BookInfos {
    date: string,
    startTime: string,
    endTime: string,
    sessionDuration: string,
    price: number
}



export const AddNewBooking = async (
    date: string,
    startTime: string,
    sessionDuration: string,
    price: number,
    useCookies?: boolean
): Promise<BookInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(`${API_URL}/api/User/daily-availability`, {
            date,
            startTime,
            sessionDuration,
            price
        }, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });
        
        // ✅ RETURN the result!
        return response.data as BookInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};


export const GetBooking = async (
    useCookies?: boolean
): Promise<BookInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/game`, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as BookInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};