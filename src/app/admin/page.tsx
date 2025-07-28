'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/lib/mred/types';
import { PropertyCacheService } from '@/lib/property-cache';
import { AdminAuthService } from '@/lib/admin-auth';
import { AdminUser, AuthUser } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'editor'>('editor');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState('');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Sign up form state
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState<'admin' | 'editor'>('editor');
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  const [cacheStatus, setCacheStatus] = useState<{
    cache: {
      totalProperties: number;
      activeProperties: number;
      propertiesWithImages: number;
      lastUpdated: string | null;
      cacheAgeHours: number | null;
      isStale: boolean;
    };
    cronJob: {
      schedule: string;
      endpoint: string;
      status: string;
    };
  } | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      setAuthLoading(true);
      const user = await AdminAuthService.getCurrentUser();
      
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        await loadData();
        await loadCacheStatus();
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password');
      return;
    }

    try {
      setIsLoggingIn(true);
      setLoginError('');
      
      const result = await AdminAuthService.signIn(loginEmail, loginPassword);
      
      if (result.success && result.user) {
        setCurrentUser(result.user);
        setIsAuthenticated(true);
        setLoginEmail('');
        setLoginPassword('');
        await loadData();
        await loadCacheStatus();
      } else {
        setLoginError(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      setSignUpError('Please fill in all fields');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError('Passwords do not match');
      return;
    }

    if (signUpPassword.length < 6) {
      setSignUpError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsSigningUp(true);
      setSignUpError('');
      
      const result = await AdminAuthService.signUp(signUpEmail, signUpPassword, signUpRole);
      
      if (result.success) {
        setSignUpSuccess('Account created successfully! You can now sign in.');
        setSignUpEmail('');
        setSignUpPassword('');
        setSignUpConfirmPassword('');
        setShowSignUp(false);
        setTimeout(() => setSignUpSuccess(''), 5000);
      } else {
        setSignUpError(result.error || 'Sign up failed');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      setSignUpError('Sign up failed. Please try again.');
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AdminAuthService.signOut();
      setCurrentUser(null);
      setIsAuthenticated(false);
      setProperties([]);
      setAdminUsers([]);
      setCacheStatus(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const loadCacheStatus = async () => {
    try {
      const response = await fetch('/api/admin/cache-status', {
        headers: {
          'Authorization': 'Bearer admin',
          'x-admin-email': currentUser?.email || ''
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCacheStatus(data);
      }
    } catch (error) {
      console.error('Error loading cache status:', error);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load properties
      const propertiesData = await PropertyCacheService.getAllProperties();
      setProperties(propertiesData);
      
      // Load admin users
      const usersData = await AdminAuthService.getAllAdminUsers();
      setAdminUsers(usersData);
      
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshProperties = async () => {
    try {
      setRefreshing(true);
      await PropertyCacheService.clearCache();
      const propertiesData = await PropertyCacheService.getAllProperties();
      setProperties(propertiesData);
      await loadCacheStatus(); // Reload cache status after refresh
    } catch (error) {
      console.error('Error refreshing properties:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const addAdminUser = async () => {
    if (!newAdminEmail.trim()) return;
    
    try {
      const success = await AdminAuthService.addAdminUser(newAdminEmail, newAdminRole);
      if (success) {
        setNewAdminEmail('');
        setNewAdminRole('editor');
        await loadData();
      }
    } catch (error) {
      console.error('Error adding admin user:', error);
    }
  };

  const removeAdminUser = async (email: string) => {
    try {
      const success = await AdminAuthService.removeAdminUser(email);
      if (success) {
        await loadData();
      }
    } catch (error) {
      console.error('Error removing admin user:', error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordChangeError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordChangeError('New password must be at least 6 characters');
      return;
    }

    try {
      setIsChangingPassword(true);
      setPasswordChangeError('');
      
      const result = await AdminAuthService.changePassword(currentPassword, newPassword);
      
      if (result.success) {
        setPasswordChangeSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowPasswordChange(false);
        setTimeout(() => setPasswordChangeSuccess(''), 5000);
      } else {
        setPasswordChangeError(result.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Password change error:', error);
      setPasswordChangeError('Failed to change password. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="container-padding py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container-padding py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
            
            {signUpSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                {signUpSuccess}
              </div>
            )}
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {loginError}
              </div>
            )}
            
            {!showSignUp ? (
              // Login Form
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 font-medium disabled:opacity-50"
                >
                  {isLoggingIn ? 'Signing In...' : 'Sign In'}
                </button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowSignUp(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Need an account? Sign up
                  </button>
                </div>
              </form>
            ) : (
              // Sign Up Form
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="signup-confirm-password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="signup-role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    id="signup-role"
                    value={signUpRole}
                    onChange={(e) => setSignUpRole(e.target.value as 'admin' | 'editor')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                {signUpError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {signUpError}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 font-medium disabled:opacity-50"
                >
                  {isSigningUp ? 'Creating Account...' : 'Create Account'}
                </button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowSignUp(false)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </form>
            )}
            
            <div className="mt-4 text-center">
              <button
                onClick={() => router.push('/')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-padding py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-padding py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage properties and admin users</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Logged in as:</p>
                <p className="font-medium text-gray-900">{currentUser?.email}</p>
              </div>
              <button
                onClick={() => setShowPasswordChange(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordChange && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Change Password</h2>
                <button
                  onClick={() => setShowPasswordChange(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {passwordChangeSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                  {passwordChangeSuccess}
                </div>
              )}

              {passwordChangeError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  {passwordChangeError}
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-new-password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium disabled:opacity-50"
                  >
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordChange(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cache Status Section */}
        {cacheStatus && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Cache Status</h2>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${cacheStatus.cache.isStale ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {cacheStatus.cache.isStale ? 'Stale' : 'Fresh'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Total Properties</h3>
                <p className="text-2xl font-bold text-blue-600">{cacheStatus.cache.totalProperties}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Active Properties</h3>
                <p className="text-2xl font-bold text-green-600">{cacheStatus.cache.activeProperties}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">With Images</h3>
                <p className="text-2xl font-bold text-purple-600">{cacheStatus.cache.propertiesWithImages}</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-800">Cache Age</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {cacheStatus.cache.cacheAgeHours !== null ? `${cacheStatus.cache.cacheAgeHours}h` : 'N/A'}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Cron Job Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Schedule:</span>
                  <p className="font-medium">{cacheStatus.cronJob.schedule}</p>
                </div>
                <div>
                  <span className="text-gray-600">Endpoint:</span>
                  <p className="font-medium">{cacheStatus.cronJob.endpoint}</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <p className="font-medium text-green-600">{cacheStatus.cronJob.status}</p>
                </div>
              </div>
              {cacheStatus.cache.lastUpdated && (
                <div className="mt-2 text-sm text-gray-500">
                  Last updated: {new Date(cacheStatus.cache.lastUpdated).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Properties Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Properties</h2>
            <button
              onClick={refreshProperties}
              disabled={refreshing}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {refreshing ? 'Refreshing...' : 'Refresh Properties'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total Properties</h3>
              <p className="text-2xl font-bold text-blue-600">{properties.length}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Active Properties</h3>
              <p className="text-2xl font-bold text-green-600">
                {properties.filter(p => p.StandardStatus === 'Active').length}
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">With Images</h3>
              <p className="text-2xl font-bold text-purple-600">
                {properties.filter(p => p.Media && p.Media.length > 0).length}
              </p>
            </div>
          </div>

          {/* Properties List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Properties</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.slice(0, 10).map((property) => (
                    <tr key={property.ListingId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {property.UnparsedAddress}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.City}, {property.StateOrProvince}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${property.ListPrice?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          property.StandardStatus === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.StandardStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a
                          href={`/property/${property.ListingId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Admin Users Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Admin Users</h2>
          
          {/* Add New Admin */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Admin User</h3>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Email address"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value as 'admin' | 'editor')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={addAdminUser}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add User
              </button>
            </div>
          </div>

          {/* Admin Users List */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => removeAdminUser(user.email)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 