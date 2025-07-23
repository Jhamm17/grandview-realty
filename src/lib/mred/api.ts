import { MRED_CONFIG } from './config';
import { Property, SearchParams } from './types';

class MLSGridService {
    private formatImageUrl(mediaUrl: string): string {
        // If it's already a proxy URL, return as is
        if (mediaUrl.startsWith('https://grandview-realty.jphamm2001.workers.dev/proxy')) {
            return mediaUrl;
        }
        
        // Otherwise, construct the proxy URL
        const proxyBaseUrl = 'https://grandview-realty.jphamm2001.workers.dev/proxy';
        const encodedUrl = encodeURIComponent(mediaUrl);
        return `${proxyBaseUrl}?url=${encodedUrl}`;
    }

    private async fetchFromAPI<T>(endpoint: string, params?: URLSearchParams): Promise<T> {
        const url = params ? 
            `${MRED_CONFIG.API_BASE_URL}/${endpoint}?${params.toString()}` :
            `${MRED_CONFIG.API_BASE_URL}/${endpoint}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${MRED_CONFIG.ACCESS_TOKEN}`,
                'Accept': 'application/json',
            },
            next: { revalidate: MRED_CONFIG.CACHE_TIMES.SEARCH_RESULTS }
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        return response.json();
    }

    public async getProperty(listingId: string): Promise<Property> {
        const data = await this.fetchFromAPI<Property>(`Property('${listingId}')`);
        return data;
    }

    public async searchProperties(params: SearchParams): Promise<Property[]> {
        const queryParams = new URLSearchParams();

        // Add pagination
        if (params.top) {
            queryParams.append('$top', params.top.toString());
        }
        if (params.skip) {
            queryParams.append('$skip', params.skip.toString());
        }
        if (params.count) {
            queryParams.append('$count', 'true');
        }

        // Build filter string
        const filters: string[] = ['MlgCanView eq true'];

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

        if (filters.length > 0) {
            queryParams.append('$filter', filters.join(' and '));
        }

        // Add ordering
        if (params.orderby) {
            queryParams.append('$orderby', params.orderby);
        }

        // Add field selection
        const defaultFields = [
            'ListingId',
            'ListPrice',
            'City',
            'StateOrProvince',
            'BedroomsTotal',
            'BathroomsTotalInteger',
            'LivingArea',
            'StandardStatus',
            'Media'
        ];

        queryParams.append('$select', params.select?.length ? params.select.join(',') : defaultFields.join(','));
        queryParams.append('$expand', 'Media'); // Add explicit expand for Media

        console.log('API Request URL:', `${MRED_CONFIG.API_BASE_URL}/Property?${queryParams.toString()}`);

        interface MLSGridResponse {
            value: Property[];
            '@odata.count'?: number;
            '@odata.nextLink'?: string;
        }

        const data = await this.fetchFromAPI<MLSGridResponse>('Property', queryParams);
        
        // Format image URLs in the response
        const formattedProperties = data.value.map(property => ({
            ...property,
            Media: property.Media?.map(media => ({
                ...media,
                MediaURL: this.formatImageUrl(media.MediaURL)
            }))
        }));

        console.log('API Response with formatted URLs:', formattedProperties);
        return formattedProperties;
    }
}

export const mlsGridService = new MLSGridService(); 