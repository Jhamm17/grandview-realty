export const MRED_CONFIG = {
  // Environment
  IS_STAGING: process.env.NODE_ENV !== 'production',

  // MLS Grid API Configuration
  API_BASE_URL: 'https://api.mlsgrid.com/v2',
  ACCESS_TOKEN: process.env.MLSGRID_ACCESS_TOKEN,

  // Rate Limiting & Pagination
  MAX_REQUESTS_PER_SECOND: 2,
  MAX_REQUESTS_PER_HOUR: 7200,
  MAX_DATA_PER_HOUR_GB: 4,
  RECORDS_PER_PAGE: 100, // Start with a smaller number for testing

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
    LISTING_DETAILS: 15 * 60, // 15 minutes
    SEARCH_RESULTS: 5 * 60,   // 5 minutes
    MEDIA: 7 * 24 * 60 * 60   // 7 days for media
  }
} as const;

export type MREDConfig = typeof MRED_CONFIG;

// Validate required environment variables
if (process.env.NODE_ENV === 'production') {
    const requiredEnvVars = [
        'MLSGRID_ACCESS_TOKEN',
        'NEXT_PUBLIC_CLOUDFLARE_URL',
        'NEXT_PUBLIC_VERCEL_URL'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
} 