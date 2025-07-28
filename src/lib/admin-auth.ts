import { supabase } from './supabase';
import { AdminUser } from './supabase';

export class AdminAuthService {
  // Check if user is admin
  static async isAdmin(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('role', 'admin')
        .single();

      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error in isAdmin:', error);
      return false;
    }
  }

  // Check if user is editor or admin
  static async isEditor(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .in('role', ['admin', 'editor'])
        .single();

      if (error) {
        console.error('Error checking editor status:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error in isEditor:', error);
      return false;
    }
  }

  // Get admin user details
  static async getAdminUser(email: string): Promise<AdminUser | null> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error getting admin user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getAdminUser:', error);
      return null;
    }
  }

  // Add admin user
  static async addAdminUser(email: string, role: 'admin' | 'editor' = 'editor'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('admin_users')
        .insert({
          email,
          role,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error adding admin user:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in addAdminUser:', error);
      return false;
    }
  }

  // Remove admin user
  static async removeAdminUser(email: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('email', email);

      if (error) {
        console.error('Error removing admin user:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in removeAdminUser:', error);
      return false;
    }
  }

  // Get all admin users
  static async getAllAdminUsers(): Promise<AdminUser[]> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error getting all admin users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllAdminUsers:', error);
      return [];
    }
  }
} 