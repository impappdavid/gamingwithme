// Centralized types for all API responses
export interface UserCommonInfos {
    id: string;
    username: string;
    isAdmin: boolean;
}

export interface UserProfile {
    id: number;
    username: string;
    avatarurl: string;
    bio: string;
    isActive: boolean;
    languages: string[];
    tags: string[];
    games: string[];
    hasStripeAccount: boolean;
    bookings: Booking[];
    availability: Availability[];
    joined: string;
    twitterUrl:string;
    instagramUrl:string;
    facebookUrl:string
}

export interface UserProfileWithTags extends UserProfile {
    tags: string[];
}

export interface Booking {
    id: string;
    startTime: Date;
    duration: string;
    customerName: string;
}

export interface Availability {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}

export interface Bill {
    bookingId: string;
    transactionDate: string;
    amount: number;
    transactionType: string;
    otherPartyUsername: string;
    otherPartyAvatarUrl: string;
}



export interface Game {
    id: number;
    name: string;
    description: string;
    slug: string;
    thumbnailUrl: string;
}

export interface RAWGGame {
    name: string;
    released: string;
    background_image: string;
    rating: number;
}

export interface OAuthResponse {
    authorizationUrl?: string;
    message?: string;
}

// API configuration
export const API_BASE_URL = 'https://localhost:7091'; 