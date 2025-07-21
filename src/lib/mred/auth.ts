import { MRED_CONFIG } from './config';
import { MREDAuthResponse } from './types';

class MREDAuthManager {
    private static instance: MREDAuthManager;
    private accessToken: string | null = null;
    private tokenExpiry: Date | null = null;

    private constructor() {}

    public static getInstance(): MREDAuthManager {
        if (!MREDAuthManager.instance) {
            MREDAuthManager.instance = new MREDAuthManager();
        }
        return MREDAuthManager.instance;
    }

    private async refreshToken(): Promise<void> {
        if (!MRED_CONFIG.CLIENT_ID || !MRED_CONFIG.CLIENT_SECRET) {
            throw new Error('Missing client credentials');
        }

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', MRED_CONFIG.CLIENT_ID);
        params.append('client_secret', MRED_CONFIG.CLIENT_SECRET);

        const response = await fetch(MRED_CONFIG.TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data: MREDAuthResponse = await response.json();
        this.accessToken = data.access_token;
        this.tokenExpiry = new Date(Date.now() + (data.expires_in * 1000));
    }

    public async getAuthHeaders(): Promise<HeadersInit> {
        if (!this.accessToken || !this.tokenExpiry || this.tokenExpiry.getTime() - Date.now() < 300000) {
            await this.refreshToken();
        }

        return {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
        };
    }
}

export const mredAuth = MREDAuthManager.getInstance(); 