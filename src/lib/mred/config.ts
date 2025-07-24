export const MRED_CONFIG = {
    // Environment
    IS_STAGING: process.env.NODE_ENV !== 'production',

    // MLS Grid API Configuration
    API_BASE_URL: process.env.MLSGRID_API_URL || 'https://api.mlsgrid.com/v2',
    ACCESS_TOKEN: process.env.MLSGRID_ACCESS_TOKEN || 'demo_token',

    // Rate Limiting & Pagination
    MAX_REQUESTS_PER_SECOND: 1, // Reduced from 2 to 1
    MAX_REQUESTS_PER_HOUR: 3600, // Reduced from 7200 to 3600
    MAX_DATA_PER_HOUR_GB: 2, // Reduced from 4 to 2
    RECORDS_PER_PAGE: 50, // Reduced from 100 to 50

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