import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get cache statistics
    const { data: properties, error: propertiesError } = await supabase
      .from('property_cache')
      .select('*');

    if (propertiesError) {
      throw new Error(`Database error: ${propertiesError.message}`);
    }

    // Get the most recent cache update
    const { data: latestUpdate, error: latestError } = await supabase
      .from('property_cache')
      .select('last_updated')
      .order('last_updated', { ascending: false })
      .limit(1);

    if (latestError) {
      throw new Error(`Database error: ${latestError.message}`);
    }

    // Calculate statistics
    const totalProperties = properties?.length || 0;
    const activeProperties = properties?.filter(p => p.is_active).length || 0;
    const propertiesWithImages = properties?.filter(p => 
      p.property_data?.Media && p.property_data.Media.length > 0
    ).length || 0;

    const lastUpdated = latestUpdate?.[0]?.last_updated || null;
    const cacheAge = lastUpdated ? 
      Math.floor((Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60)) : 
      null; // hours

    return NextResponse.json({
      success: true,
      cache: {
        totalProperties,
        activeProperties,
        propertiesWithImages,
        lastUpdated,
        cacheAgeHours: cacheAge,
        isStale: cacheAge !== null && cacheAge > 2 // Consider stale if older than 2 hours
      },
      cronJob: {
        schedule: 'Every hour (0 * * * *)',
        endpoint: '/api/admin/refresh-cache',
        status: 'active'
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error getting cache status:', error);
    return NextResponse.json(
      { error: 'Failed to get cache status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 