export const MRED_CONFIG = {
    // API Configuration
    API_BASE_URL: process.env.NEXT_PUBLIC_MRED_API_URL || 'https://api.mred.com/v2',
    TOKEN_ENDPOINT: process.env.NEXT_PUBLIC_MRED_TOKEN_URL || 'https://api.mred.com/oauth/token',
    CLIENT_ID: process.env.MRED_CLIENT_ID,
    CLIENT_SECRET: process.env.MRED_CLIENT_SECRET,
    
    // Rate Limiting
    MAX_REQUESTS_PER_SECOND: 2,
    MAX_REQUESTS_PER_HOUR: 7200,
    MAX_DATA_PER_HOUR_GB: 4,
    
    // Caching
    CACHE_TIMES: {
        LISTING_DETAILS: 15 * 60, // 15 minutes
        SEARCH_RESULTS: 5 * 60,   // 5 minutes
        FULL_SYNC: 24 * 60 * 60   // 24 hours
    },
    
    // Sync Settings
    SYNC_INTERVALS: {
        FULL_SYNC: 24 * 60 * 60 * 1000,    // 24 hours
        INCREMENTAL_SYNC: 15 * 60 * 1000,   // 15 minutes
        BATCH_SIZE: 100                     // Number of records per page
    },

    // Error Handling
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
    
    // Image Storage
    IMAGE_STORAGE_PATH: '/property-images',
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    
    // Feature Flags
    ENABLE_CACHING: true,
    ENABLE_RATE_LIMITING: true,
    ENABLE_IMAGE_OPTIMIZATION: true,
    
    // Monitoring
    ENABLE_MONITORING: true,
    LOG_LEVEL: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
} as const;

// Type for the config
export type MREDConfig = typeof MRED_CONFIG;

// Validate required environment variables
if (process.env.NODE_ENV === 'production') {
    const requiredEnvVars = [
        'NEXT_PUBLIC_MRED_API_URL',
        'MRED_CLIENT_ID',
        'MRED_CLIENT_SECRET'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
} 