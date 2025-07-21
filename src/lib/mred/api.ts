import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Property, CacheEntry, SearchParams } from './types';
import { errorHandler, RateLimitError, APIError } from './errors';
import { mredMonitoring } from './monitoring';
import { MRED_CONFIG } from './config';

export type { Property, SearchParams };

class MREDService {
    private cache: Map<string, CacheEntry<Property | Property[]>>;
    private ratelimit: Ratelimit;
    
    constructor() {
        // In-memory cache for development, can be replaced with Redis
        this.cache = new Map();
        
        // Initialize rate limiter (2 requests per second)
        this.ratelimit = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(2, '1s'),
            analytics: true,
        });
    }

    private async checkRateLimit(identifier: string): Promise<boolean> {
        const { success } = await this.ratelimit.limit(identifier);
        if (!success) {
            throw new RateLimitError();
        }
        return success;
    }

    private getCachedData<T extends Property | Property[]>(key: string): T | null {
        const cached = this.cache.get(key);
        if (!cached) return null;
        
        const now = Date.now();
        if (now - cached.timestamp > MRED_CONFIG.CACHE_TIMES.LISTING_DETAILS * 1000) {
            this.cache.delete(key);
            return null;
        }
        
        return cached.data as T;
    }

    private setCachedData<T extends Property | Property[]>(key: string, data: T) {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    async getProperty(id: string): Promise<Property | null> {
        const startTime = Date.now();
        try {
            // For individual properties, use a shorter cache time or no cache
            // since we want real-time status updates
            const cacheEntry = this.cache.get(`property:${id}`);
            if (cacheEntry && Date.now() - cacheEntry.timestamp < 60000) { // 1 minute cache for individual properties
                mredMonitoring.trackRequest(startTime, 0);
                return cacheEntry.data as Property;
            }

            await this.checkRateLimit('get-property');

            const response = await fetch(`${MRED_CONFIG.API_BASE_URL}/properties/${id}`);
            const responseSize = parseInt(response.headers.get('content-length') || '0', 10);
            
            if (!response.ok) {
                throw new APIError(response.statusText, response.status);
            }

            const data = await response.json();
            
            // Short cache duration for individual properties
            this.setCachedData<Property>(`property:${id}`, data);
            
            mredMonitoring.trackRequest(startTime, responseSize);
            
            return data;
        } catch (error) {
            return await errorHandler.handleError(error as Error, `getProperty(${id})`);
        }
    }

    async searchProperties(params: SearchParams): Promise<Property[]> {
        const startTime = Date.now();
        try {
            const cacheKey = `search:${JSON.stringify(params)}`;
            
            // Cache search results for a short time to prevent hammering the API
            const cacheEntry = this.cache.get(cacheKey);
            if (cacheEntry && Date.now() - cacheEntry.timestamp < 300000) { // 5 minute cache for search results
                mredMonitoring.trackRequest(startTime, 0);
                return cacheEntry.data as Property[];
            }

            await this.checkRateLimit('search-properties');

            const response = await fetch(`${MRED_CONFIG.API_BASE_URL}/properties/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            
            const responseSize = parseInt(response.headers.get('content-length') || '0', 10);
            
            if (!response.ok) {
                throw new APIError(response.statusText, response.status);
            }

            const data = await response.json();
            
            // Cache search results
            this.setCachedData<Property[]>(cacheKey, data);
            
            mredMonitoring.trackRequest(startTime, responseSize);
            
            return data;
        } catch (error) {
            return await errorHandler.handleError(error as Error, `searchProperties(${JSON.stringify(params)})`);
        }
    }

    // Helper method to pre-fetch related properties
    async prefetchRelatedProperties(property: Property): Promise<void> {
        try {
            // Pre-fetch properties in the same area/price range
            this.searchProperties({
                city: property.City,
                minPrice: property.ListPrice * 0.8,
                maxPrice: property.ListPrice * 1.2,
                limit: 10
            }).catch(() => {}); // Ignore errors in pre-fetching
        } catch (error) {
            // Ignore pre-fetch errors
            console.debug('Failed to pre-fetch related properties:', error);
        }
    }
}

// Export singleton instance
export const mredService = new MREDService(); 