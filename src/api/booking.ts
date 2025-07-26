import axios from "axios";

// Describes a single booking slot/record
export interface BookInfos {
    id: string,
    date: string,
    startTime: string,
    endTime: string,
    sessionDuration: string,
    isAvailable: boolean,
    price: number
}

// Adds a new booking slot on a specific date/time
export const AddNewBooking = async (
    date: string,
    startTime: string,
    sessionDuration: string,
    price: number,
    useCookies?: boolean
): Promise<BookInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        // Optional "useCookies" param is included if present, else sends nothing
        const response = await axios.post(
            `${API_URL}/api/User/daily-availability`,
            { date, startTime, sessionDuration, price },
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true, // include browser cookies/session info
            }
        );
        // Returns the updated list of bookings
        return response.data as BookInfos[];
    } catch (error) {
        // Logs error for debugging, then returns null to signal failure
        console.error('Error fetching users:', error);
        return null;
    }
};

// Fetch bookings for a given date (for the logged-in user)
export const GetBooking = async (
    date: string,
    useCookies?: boolean
): Promise<BookInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        // "date" is passed directly in the URL path
        const response = await axios.get(
            `${API_URL}/api/user/daily-availability/${date}`,
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true,
            }
        );

        return response.data as BookInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

// Fetch bookings for a specific user and date
export const GetBookingsByNameAndDate = async (
    username: string,
    date: string,
    useCookies?: boolean
): Promise<BookInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        // Both "username" and "date" are part of the URL path
        const response = await axios.get(
            `${API_URL}/api/user/${username}/daily-availability/${date}`,
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true,
            }
        );

        return response.data as BookInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

// Delete a booking using the date and start time
export const DeleteBooking = async (
    date: string,
    startTime: string,
    useCookies?: boolean
): Promise<BookInfos[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        // Booking is identified by both "date" and "startTime" in URL
        const response = await axios.delete(
            `${API_URL}/api/User/daily-availability/${date}/${startTime}`,
            {
                params: useCookies !== undefined ? { useCookies } : {},
                withCredentials: true,
            }
        );

        return response.data as BookInfos[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};
