import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Property, CacheEntry, SearchParams, MLSGridResponse } from './types';
import { errorHandler, RateLimitError, APIError } from './errors';
import { mredMonitoring } from './monitoring';
import { MRED_CONFIG } from './config';

export type { Property, SearchParams };

class MLSGridService {
    private cache: Map<string, CacheEntry<Property | Property[]>>;
    private ratelimit: Ratelimit;
    
    constructor() {
        this.cache = new Map();
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

    private getAuthHeaders(): HeadersInit {
        if (!MRED_CONFIG.ACCESS_TOKEN) {
            throw new Error('Access token not configured');
        }

        return {
            'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        };
    }

    private buildFilterString(params: SearchParams): string {
        const filters: string[] = [];

        // Always include MlgCanView filter
        filters.push('MlgCanView eq true');

        if (params.city) {
            filters.push(`City eq '${params.city}'`);
        }
        if (params.minPrice) {
            filters.push(`ListPrice ge ${params.minPrice}`);
        }
        if (params.maxPrice) {
            filters.push(`ListPrice le ${params.maxPrice}`);
        }
        if (params.beds) {
            filters.push(`BedroomsTotal eq ${params.beds}`);
        }
        if (params.baths) {
            filters.push(`BathroomsTotalInteger eq ${params.baths}`);
        }
        if (params.status) {
            filters.push(`StandardStatus eq '${params.status}'`);
        }
        if (params.propertyType) {
            filters.push(`PropertyType eq '${params.propertyType}'`);
        }
        if (params.modifiedSince) {
            filters.push(`ModificationTimestamp gt ${params.modifiedSince.toISOString()}`);
        }

        return filters.join(' and ');
    }

    private buildQueryString(params: SearchParams): string {
        const queryParams: string[] = [];

        // Add filter if any
        const filter = this.buildFilterString(params);
        if (filter) {
            queryParams.push(`$filter=${encodeURIComponent(filter)}`);
        }

        // Add pagination
        queryParams.push(`$top=${Math.min(params.top || 100, MRED_CONFIG.RECORDS_PER_PAGE)}`);
        if (params.skip) {
            queryParams.push(`$skip=${params.skip}`);
        }

        // Add count if requested
        if (params.count) {
            queryParams.push('$count=true');
        }

        // Add select if specified
        if (params.select?.length) {
            queryParams.push(`$select=${params.select.join(',')}`);
        }

        // Add orderby if specified
        if (params.orderby) {
            queryParams.push(`$orderby=${params.orderby}`);
        }

        return queryParams.join('&');
    }

    private getMediaUrl(mediaId: string): string {
        if (MRED_CONFIG.USE_CDN) {
            return `${MRED_CONFIG.MEDIA_CDN_URL}/photos/${mediaId}`;
        }
        return `${MRED_CONFIG.API_BASE_URL}/${MRED_CONFIG.RESOURCES.MEDIA}('${mediaId}')/$value`;
    }

    async getProperty(id: string): Promise<Property | null> {
        const startTime = Date.now();
        try {
            // For individual properties, use a shorter cache time
            const cacheEntry = this.cache.get(`property:${id}`);
            if (cacheEntry && Date.now() - cacheEntry.timestamp < 60000) { // 1 minute cache
                mredMonitoring.trackRequest(startTime, 0);
                return cacheEntry.data as Property;
            }

            await this.checkRateLimit('get-property');

            const response = await fetch(`${MRED_CONFIG.API_BASE_URL}/${MRED_CONFIG.RESOURCES.PROPERTY}('${id}')`, {
                headers: this.getAuthHeaders()
            });
            
            const responseSize = parseInt(response.headers.get('content-length') || '0', 10);
            
            if (!response.ok) {
                throw new APIError(response.statusText, response.status);
            }

            const data = await response.json();
            
            // Transform media URLs if present
            if (data.Photos?.length) {
                data.Photos = data.Photos.map((mediaId: string) => this.getMediaUrl(mediaId));
            }
            
            // Cache the result
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
            const queryString = this.buildQueryString(params);
            const cacheKey = `search:${queryString}`;
            
            // Cache search results for a short time
            const cacheEntry = this.cache.get(cacheKey);
            if (cacheEntry && Date.now() - cacheEntry.timestamp < 300000) { // 5 minute cache
                mredMonitoring.trackRequest(startTime, 0);
                return cacheEntry.data as Property[];
            }

            await this.checkRateLimit('search-properties');

            const response = await fetch(`${MRED_CONFIG.API_BASE_URL}/${MRED_CONFIG.RESOURCES.PROPERTY}?${queryString}`, {
                headers: this.getAuthHeaders()
            });
            
            const responseSize = parseInt(response.headers.get('content-length') || '0', 10);
            
            if (!response.ok) {
                throw new APIError(response.statusText, response.status);
            }

            const data: MLSGridResponse<Property> = await response.json();
            
            // Transform media URLs for all properties
            const properties = data.value.map(property => ({
                ...property,
                Photos: property.Photos?.map(mediaId => this.getMediaUrl(mediaId))
            }));
            
            // Cache the result
            this.setCachedData<Property[]>(cacheKey, properties);
            
            mredMonitoring.trackRequest(startTime, responseSize);
            
            return properties;
        } catch (error) {
            return await errorHandler.handleError(error as Error, `searchProperties(${JSON.stringify(params)})`);
        }
    }

    async getAllProperties(params: SearchParams = {}): Promise<Property[]> {
        const allProperties: Property[] = [];
        let skip = 0;
        let hasMore = true;

        while (hasMore) {
            const searchParams: SearchParams = {
                ...params,
                top: MRED_CONFIG.RECORDS_PER_PAGE,
                skip,
                count: true
            };

            const properties = await this.searchProperties(searchParams);
            allProperties.push(...properties);

            if (properties.length < MRED_CONFIG.RECORDS_PER_PAGE) {
                hasMore = false;
            } else {
                skip += MRED_CONFIG.RECORDS_PER_PAGE;
            }

            // Respect rate limits
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        return allProperties;
    }
}

// Export singleton instance
export const mlsGridService = new MLSGridService(); 