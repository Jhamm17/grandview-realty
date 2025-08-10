import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: careers, error } = await supabase
      .from('careers')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching careers:', error);
      return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 });
    }

    // Set cache control headers to prevent caching
    const response = NextResponse.json({ careers });
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error in GET /api/careers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 