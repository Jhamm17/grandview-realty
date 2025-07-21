import { MRED_CONFIG } from './config';
import { mredMonitoring } from './monitoring';

// Custom error types
export class MREDError extends Error {
    constructor(
        message: string,
        public code: string,
        public status?: number,
        public retryable: boolean = true
    ) {
        super(message);
        this.name = 'MREDError';
    }
}

export class RateLimitError extends MREDError {
    constructor(message: string = 'Rate limit exceeded') {
        super(message, 'RATE_LIMIT_EXCEEDED', 429, true);
        this.name = 'RateLimitError';
    }
}

export class AuthenticationError extends MREDError {
    constructor(message: string = 'Authentication failed') {
        super(message, 'AUTH_FAILED', 401, true);
        this.name = 'AuthenticationError';
    }
}

export class APIError extends MREDError {
    constructor(message: string, status: number) {
        super(message, 'API_ERROR', status, status < 500);
        this.name = 'APIError';
    }
}

class ErrorHandler {
    private static instance: ErrorHandler;
    private retryDelays: number[] = [1000, 2000, 5000]; // Retry delays in ms

    private constructor() {}

    public static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    public async handleError(error: Error, context: string): Promise<never> {
        // Track error in monitoring
        mredMonitoring.trackRequest(Date.now(), 0, true);

        // Log error with context
        console.error(`[MRED ${context}] ${error.message}`, {
            name: error.name,
            stack: error.stack,
            context
        });

        if (error instanceof MREDError) {
            await this.handleMREDError(error, context);
        }

        throw error;
    }

    private async handleMREDError(error: MREDError, context: string) {
        switch (error.code) {
            case 'RATE_LIMIT_EXCEEDED':
                // Implement rate limit backoff
                await this.handleRateLimit();
                break;
            
            case 'AUTH_FAILED':
                // Trigger token refresh
                await this.handleAuthError();
                break;
            
            default:
                // Generic error handling
                if (error.retryable) {
                    await this.retryOperation(context);
                }
        }
    }

    private async handleRateLimit() {
        // Implement exponential backoff
        const delay = Math.floor(Math.random() * 1000) + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    private async handleAuthError() {
        // TODO: Implement token refresh logic
        console.warn('[MRED Auth] Token refresh required');
    }

    private async retryOperation(context: string, attempt: number = 0) {
        if (attempt >= MRED_CONFIG.MAX_RETRIES) {
            throw new Error(`Max retries exceeded for operation: ${context}`);
        }

        const delay = this.retryDelays[attempt] || this.retryDelays[this.retryDelays.length - 1];
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    public isRetryableError(error: Error): boolean {
        if (error instanceof MREDError) {
            return error.retryable;
        }
        
        // Default retry strategy for unknown errors
        return true;
    }
}

export const errorHandler = ErrorHandler.getInstance(); 