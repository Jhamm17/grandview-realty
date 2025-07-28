import { supabase } from './supabase';
import { AdminUser, AuthUser } from './supabase';

export class AdminAuthService {
  // Create a new admin user (admin-only function)
  static async createAdminUser(email: string, password: string, role: 'admin' | 'editor' = 'editor'): Promise<{ success: boolean; error?: string }> {
    try {
      // First, create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm the email
        user_metadata: {
          role: role
        }
      });

      if (authError) {
        console.error('Auth user creation error:', authError);
        return { success: false, error: authError.message };
      }

      if (authData.user) {
        // Then add them to our admin_users table
        const { error: dbError } = await supabase
          .from('admin_users')
          .insert({
            id: authData.user.id,
            email: email,
            role: role,
            created_at: new Date().toISOString()
          });

        if (dbError) {
          console.error('Database insert error:', dbError);
          return { success: false, error: 'Failed to create admin user' };
        }

        return { success: true };
      }

      return { success: false, error: 'User creation failed' };
    } catch (error) {
      console.error('Error in createAdminUser:', error);
      return { success: false, error: 'Admin user creation failed' };
    }
  }

  // Sign in with email and password
  static async signIn(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Check if user is in admin_users table
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (adminError || !adminUser) {
          return { success: false, error: 'Not authorized as admin' };
        }

        // Update last login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id);

        return {
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email!,
            role: adminUser.role
          }
        };
      }

      return { success: false, error: 'Sign in failed' };
    } catch (error) {
      console.error('Error in signIn:', error);
      return { success: false, error: 'Sign in failed' };
    }
  }

  // Sign out
  static async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      console.error('Error in signOut:', error);
      return { success: false, error: 'Sign out failed' };
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        return null;
      }

      // Get admin user details
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (adminError || !adminUser) {
        return null;
      }

      return {
        id: user.id,
        email: user.email!,
        role: adminUser.role
      };
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      return null;
    }
  }

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

  // Add admin user (for existing Supabase users)
  static async addAdminUser(email: string, role: 'admin' | 'editor' = 'editor'): Promise<boolean> {
    try {
      // First check if user exists in Supabase Auth
      const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error listing users:', authError);
        return false;
      }

      const authUser = users.find(u => u.email === email);
      if (!authUser) {
        console.error('User not found in Supabase Auth');
        return false;
      }

      // Add to admin_users table
      const { error } = await supabase
        .from('admin_users')
        .insert({
          id: authUser.id,
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
        console.error('Error getting admin users:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllAdminUsers:', error);
      return [];
    }
  }

  // Change password for current user
  static async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      // First, verify the current password by attempting to sign in
      const { data: { user }, error: currentUserError } = await supabase.auth.getUser();
      
      if (currentUserError || !user) {
        return { success: false, error: 'Not authenticated' };
      }

      // Update the password using Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Password update error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error in changePassword:', error);
      return { success: false, error: 'Failed to change password' };
    }
  }

  // Reset password (for admin use)
  static async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin?reset=true`
      });

      if (error) {
        console.error('Password reset error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error in resetPassword:', error);
      return { success: false, error: 'Failed to send reset email' };
    }
  }
} 