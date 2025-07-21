export interface Property {
    ListingKey: string;
    ListPrice: number;
    BedroomsTotal: number;
    BathroomsTotalInteger: number;
    LivingArea: number;
    City: string;
    StateOrProvince: string;
    PostalCode: string;
    StandardStatus: string;
    PublicRemarks: string;
    Photos?: string[];
}

export interface PropertyPhoto {
    MediaURL: string;
    MediaType: string;
    Order: number;
}

export interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

export interface SearchParams {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    beds?: number;
    baths?: number;
    status?: string;
    limit?: number;
    page?: number;
    modifiedSince?: Date;
}

export interface MREDAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
} 