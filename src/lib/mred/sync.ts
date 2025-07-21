import { mredService } from './api';
import { Property } from './types';

class MREDSyncService {
    private static instance: MREDSyncService;
    private lastFullSync: Date | null = null;
    private lastIncrementalSync: Date | null = null;
    private isRunning = false;

    private constructor() {
        // Start sync processes
        this.startSyncProcesses();
    }

    public static getInstance(): MREDSyncService {
        if (!MREDSyncService.instance) {
            MREDSyncService.instance = new MREDSyncService();
        }
        return MREDSyncService.instance;
    }

    private async fullSync() {
        if (this.isRunning) return;
        this.isRunning = true;

        try {
            console.log('Starting full sync...');
            
            // Get all properties with pagination
            const pageSize = 100;
            let hasMore = true;
            let currentPage = 1;

            while (hasMore) {
                const properties = await mredService.searchProperties({
                    limit: pageSize,
                    page: currentPage
                });

                if (properties.length < pageSize) {
                    hasMore = false;
                }

                // Process properties (store in database, update cache, etc.)
                await this.processProperties(properties);

                currentPage++;
            }

            this.lastFullSync = new Date();
            console.log('Full sync completed');
        } catch (error) {
            console.error('Error during full sync:', error);
        } finally {
            this.isRunning = false;
        }
    }

    private async incrementalSync() {
        if (this.isRunning) return;
        this.isRunning = true;

        try {
            console.log('Starting incremental sync...');
            
            // Get only recently updated properties
            const properties = await mredService.searchProperties({
                modifiedSince: this.lastIncrementalSync || this.lastFullSync || new Date(0),
                limit: 100
            });

            // Process properties
            await this.processProperties(properties);

            this.lastIncrementalSync = new Date();
            console.log('Incremental sync completed');
        } catch (error) {
            console.error('Error during incremental sync:', error);
        } finally {
            this.isRunning = false;
        }
    }

    private async processProperties(properties: Property[]) {
        // Here you would:
        // 1. Update your database
        // 2. Update cache
        // 3. Trigger any necessary webhooks
        // 4. Update search indices
        
        for (const property of properties) {
            try {
                // Example processing
                await this.updateDatabase(property);
                await this.updateSearchIndex(property);
            } catch (error) {
                console.error(`Error processing property ${property.ListingKey}:`, error);
            }
        }
    }

    private async updateDatabase(property: Property) {
        // TODO: Implement database update
        console.log(`Updating database for property ${property.ListingKey}`);
    }

    private async updateSearchIndex(property: Property) {
        // TODO: Implement search index update
        console.log(`Updating search index for property ${property.ListingKey}`);
    }

    private startSyncProcesses() {
        // Run full sync daily
        setInterval(() => {
            this.fullSync();
        }, 24 * 60 * 60 * 1000); // 24 hours

        // Run incremental sync every 15 minutes
        setInterval(() => {
            this.incrementalSync();
        }, 15 * 60 * 1000); // 15 minutes

        // Run initial sync
        this.fullSync();
    }

    public getLastSyncTimes() {
        return {
            lastFullSync: this.lastFullSync,
            lastIncrementalSync: this.lastIncrementalSync
        };
    }
}

// Export singleton instance
export const mredSync = MREDSyncService.getInstance(); 