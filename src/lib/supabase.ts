import { createClient } from '@supabase/supabase-js';
import { Property } from './mred/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database types
export interface PropertyCache {
  id: string;
  listing_id: string;
  property_data: Property;
  last_updated: string;
  is_active: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
  created_at: string;
  last_login?: string;
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
} 