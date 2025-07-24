export const MRED_CONFIG = {
    // Environment
    IS_STAGING: process.env.NODE_ENV !== 'production',

    // MLS Grid API Configuration
    API_BASE_URL: process.env.MLSGRID_API_URL || 'https://api.mlsgrid.com/v2',
    ACCESS_TOKEN: process.env.MLSGRID_ACCESS_TOKEN || 'demo_token',

    // Rate Limiting & Pagination
    MAX_REQUESTS_PER_SECOND: 0.5, // Reduced to 1 request every 2 seconds (well below 2 RPS limit)
    MAX_REQUESTS_PER_HOUR: 1800, // Reduced to 1800 requests/hour (0.5 RPS * 3600 seconds)
    MAX_DATA_PER_HOUR_GB: 1, // Reduced to 1GB/hour
    RECORDS_PER_PAGE: 25, // Reduced to 25 records per page

    // Resource Types
    RESOURCES: {
        PROPERTY: 'Property',
        MEMBER: 'Member',
        OFFICE: 'Office',
        MEDIA: 'Media'
    },

    // Searchable Fields (MLS Grid standard)
    SEARCHABLE_FIELDS: {
        MODIFICATION_TIMESTAMP: 'ModificationTimestamp',
        ORIGINATING_SYSTEM: 'OriginatingSystemName',
        STATUS: 'StandardStatus',
        LISTING_ID: 'ListingId',
        CAN_VIEW: 'MlgCanView'
    },

    // Caching
    CACHE_TIMES: {
        LISTING_DETAILS: 30 * 60, // Increased from 15 to 30 minutes
        SEARCH_RESULTS: 15 * 60,   // Increased from 5 to 15 minutes
        MEDIA: 7 * 24 * 60 * 60   // 7 days for media
    }
} as const;

export type MREDConfig = typeof MRED_CONFIG;

// Log configuration status instead of throwing
if (process.env.NODE_ENV === 'production') {
    if (!process.env.MLSGRID_ACCESS_TOKEN) {
        console.warn('Warning: MLSGRID_ACCESS_TOKEN not configured. Using demo mode.');
    }
} 