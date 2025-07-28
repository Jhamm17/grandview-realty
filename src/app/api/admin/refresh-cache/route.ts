import { NextRequest, NextResponse } from 'next/server';
import { PropertyCacheService } from '@/lib/property-cache';
import { AdminAuthService } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    // Get admin email from request headers or body
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

    // Clear cache and refresh
    await PropertyCacheService.clearCache();
    const properties = await PropertyCacheService.getAllProperties();

    return NextResponse.json({
      success: true,
      message: 'Cache refreshed successfully',
      propertiesCount: properties.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error refreshing cache:', error);
    return NextResponse.json(
      { error: 'Failed to refresh cache' },
      { status: 500 }
    );
  }
} 