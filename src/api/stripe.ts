import axios from "axios";

export interface Payment {
    checkoutUrl: string,
    priceAmount: number,
    applicationFee: number,
    sessionId:string,
    connectedAccount: string,
    paymentType: string
}

export const PaymentWithStripe = async (
    providerId: string,
    paymentType: string,
    serviceId: string,
    customerNotes?: string,
    useCookies?: boolean
): Promise<Payment> => {
    console.log()
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(`${API_URL}/api/Stripe/pay/${providerId}`, {
            paymentType,
            serviceId,
            customerNotes
        }, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as Payment;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw after handling
    }
};