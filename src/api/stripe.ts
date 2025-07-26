import axios from "axios";

export interface Payment {
    checkoutUrl: string,
    priceAmount: number,
    applicationFee: number,
    sessionId: string,
    connectedAccount: string,
    paymentType: string
}

export interface Coupon {
    valid: boolean,
    couponId: string,
    name: string,
    percentOff: number,
    expiresAt: string
}

export const PaymentWithStripe = async (
    providerId: string,
    paymentType: string,
    serviceId: string,
    customerNotes?: string,
    couponId?: string,
    useCookies?: boolean
): Promise<Payment> => {
    console.log(customerNotes)
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(`${API_URL}/api/Stripe/pay/${providerId}`, {
            paymentType,
            serviceId,
            customerNotes,
            couponId
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

export const PaymentWithStripeBooking = async (
    providerId: string,
    paymentType: string,
    appointmentId: string,
    customerNotes?: string,
    couponId?: string,
    useCookies?: boolean
): Promise<Payment> => {
    console.log(customerNotes)
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.post(`${API_URL}/api/Stripe/pay/${providerId}`, {
            paymentType,
            appointmentId,
            customerNotes,
            couponId
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

export const ValidateCoupon = async (
    couponName: string,
    useCookies?: boolean
): Promise<Coupon> => {
    console.log()
    try {
        const API_URL = 'https://localhost:7091';
        const response = await axios.get(`${API_URL}/api/Stripe/validate-coupon-by-name/${couponName}`, {
            params: useCookies !== undefined ? { useCookies } : {},
            withCredentials: true,
        });

        // ✅ RETURN the result!
        return response.data as Coupon;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw after handling
    }
};