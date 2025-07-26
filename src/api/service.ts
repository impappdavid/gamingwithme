import axios from "axios";

export interface Service {
    id: string,
    title: string,
    description: string,
    price: number,
    deliveryDeadline: number,
    status: number,
    username: string,
    avatarUrl: string,
    createdAt: string
}

export const GetServicesById = async (
    userId: string
): Promise<Service[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/fixedservices`, {
            params: { userId },
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as Service[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};


export const GetMyServices = async (
    useCookies?: boolean
): Promise<Service[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/fixedservices/my-services`, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as Service[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};


export const AddNewService = async(
    title: string,
    description: string,
    price: number,
    deliveryDeadline: number,
    useCookies ?: boolean
): Promise<Service[] | null> => {
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(`${API_URL}/api/fixedservices`, {
            title,
            description,
            price,
            deliveryDeadline
        }, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as Service[];
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export const EditService = async (
    id: string,
    data: {
      title: string
      description: string
      status: number
    },
    useCookies?: boolean
  ): Promise<Service[] | null> => {
    try {
      const API_URL = "https://localhost:7091"
      const response = await axios.put(`${API_URL}/api/fixedservices/${id}`, data, {
        params: useCookies !== undefined ? { useCookies } : {},
        withCredentials: true,
      })
  
      return response.data as Service[]
    } catch (error) {
      console.error("Error editing service:", error)
      return null
    }
  }

export const DeleteService = async (serviceId: string) => {
    const API_URL = 'https://localhost:7091';
    const response = await axios.delete(`${API_URL}/api/fixedservices/${serviceId}`, { withCredentials: true });
    return response.data;
};

