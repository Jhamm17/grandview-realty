import { NextRequest, NextResponse } from 'next/server';
import { PropertyCacheService } from '@/lib/property-cache';
import { AdminAuthService } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    // Check if this is a cron job request (Vercel cron jobs send a special header)
    const isCronJob = request.headers.get('x-vercel-cron') === '1';
    
    if (isCronJob) {
      // For cron jobs, we don't need admin authentication
      console.log('🕐 Cron job triggered - refreshing property cache...');
    } else {
      // For manual requests, require admin authentication
      const { adminEmail } = await request.json();
      
      if (!adminEmail) {
        return NextResponse.json(
          { error: 'Admin email required' },
          { status: 400 }
        );
      }

      // Check if user is admin
      const isAdmin = await AdminAuthService.isAdmin(adminEmail);
      if (!isAdmin) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      
      console.log(`👤 Manual cache refresh requested by admin: ${adminEmail}`);
    }

    // Clear cache and refresh
    console.log('🗑️ Clearing existing cache...');
    await PropertyCacheService.clearCache();
    
    console.log('🔄 Fetching fresh properties from MLS API...');
    const properties = await PropertyCacheService.getAllProperties();

    console.log(`✅ Cache refresh completed! Loaded ${properties.length} properties`);

    return NextResponse.json({
      success: true,
      message: 'Cache refreshed successfully',
      propertiesCount: properties.length,
      timestamp: new Date().toISOString(),
      triggeredBy: isCronJob ? 'cron-job' : 'admin'
    });

  } catch (error) {
    console.error('❌ Error refreshing cache:', error);
    return NextResponse.json(
      { error: 'Failed to refresh cache', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 