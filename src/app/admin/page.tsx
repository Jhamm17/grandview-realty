'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuthService } from '@/lib/admin-auth';
import { ClientPropertyService } from '@/lib/client-property-service';
import { AuthUser } from '@/lib/supabase';
import { Property } from '@/lib/mred/types';
import { cleanStatusText } from '@/lib/utils';
import AdminAgentManager from '@/components/AdminAgentManager';
import AdminOfficeStaffManager from '@/components/AdminOfficeStaffManager';

export default function AdminDashboard() {
  const router = useRouter();
  
  // Add error state
  const [error, setError] = useState<string | null>(null);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Admin dashboard state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [underContractProperties, setUnderContractProperties] = useState<Property[]>([]);
  const [showAgentManager, setShowAgentManager] = useState(false);
  const [showOfficeStaffManager, setShowOfficeStaffManager] = useState(false);

  useEffect(() => {
    try {
      console.log('AdminDashboard: Initializing...');
      console.log('AdminDashboard: Environment check - SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'present' : 'missing');
      console.log('AdminDashboard: Environment check - SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'present' : 'missing');
      
      // Check if user is already logged in (from localStorage)
      const savedUser = localStorage.getItem('adminUser');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          console.log('AdminDashboard: Found saved user:', user);
          setCurrentUser(user);
          setIsAuthenticated(true);
          loadPropertyData();
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('adminUser');
        }
      } else {
        console.log('AdminDashboard: No saved user found');
      }
      setLoading(false);
    } catch (error) {
      console.error('AdminDashboard: Error in useEffect:', error);
      setError('Failed to initialize admin dashboard');
      setLoading(false);
    }
  }, []);

  const loadPropertyData = async () => {
    try {
      console.log('AdminDashboard: Loading property data...');
      const allProperties = await ClientPropertyService.getAllProperties();
      console.log('AdminDashboard: Loaded properties:', allProperties.length);
      setProperties(allProperties);
      
      // Get under contract properties using the dedicated method
      const underContract = await ClientPropertyService.getUnderContractProperties();
      console.log('AdminDashboard: Loaded under contract properties:', underContract.length);
      setUnderContractProperties(underContract);
    } catch (error) {
      console.error('Error loading property data:', error);
      setError('Failed to load property data: ' + (error as Error).message);
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
      
      console.log('Attempting login with:', { email: loginEmail });
      const result = await AdminAuthService.signIn(loginEmail, loginPassword);
      console.log('Login result:', result);
      
      if (result.success && result.user) {
        setCurrentUser(result.user);
        setIsAuthenticated(true);
        setLoginEmail('');
        setLoginPassword('');
        
        // Save user to localStorage for persistence
        localStorage.setItem('adminUser', JSON.stringify(result.user));
        
        // Load property data after login
        await loadPropertyData();
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

  const handleLogout = async () => {
    try {
      await AdminAuthService.signOut();
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('adminUser');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshCache = async () => {
    try {
      setRefreshing(true);
      console.log('Refreshing cache...');
      // For client-side, we'll just reload the data since we can't clear server cache
      await loadPropertyData();
      console.log('Cache refresh completed');
    } catch (error) {
      console.error('Error refreshing cache:', error);
    } finally {
      setRefreshing(false);
    }
  };





  if (error) {
    return (
      <div className="container-padding py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <h2 className="text-lg font-semibold mb-2">Error</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reload Page
            </button>
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
          <p className="mt-4 text-gray-600">Loading...</p>
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
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {loginError}
              </div>
            )}
            
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
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Need admin access? Contact an existing administrator.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/')}
                  className="text-gray-500 hover:text-gray-700 text-sm block w-full"
                >
                  ← Back to Home
                </button>
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
      </div>
    );
  }

  // Show admin dashboard
  try {
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
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Team Management */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Team Management</h2>
            <div className="space-x-2">
              <button
                onClick={() => setShowAgentManager(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
              >
                Manage Agents
              </button>
              <button
                onClick={() => setShowOfficeStaffManager(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 font-medium"
              >
                Manage Office Staff
              </button>
            </div>
          </div>
          <p className="text-gray-600">Add, edit, or remove agents and office staff members from the website.</p>
        </div>

        {/* Cache Management */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Cache Management</h2>
            <button
              onClick={refreshCache}
              disabled={refreshing}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50 font-medium"
            >
              {refreshing ? 'Refreshing...' : 'Refresh Property Cache'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800">Under Contract</h3>
              <p className="text-2xl font-bold text-orange-600">{underContractProperties.length}</p>
            </div>
          </div>
        </div>

        {/* Property Status Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Property Status Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(
                  properties.reduce((acc, property) => {
                    const status = property.StandardStatus || 'Unknown';
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                )
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .map(([status, count]) => (
                  <tr key={status}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{cleanStatusText(status)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{count}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {((count / properties.length) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Under Contract Properties */}
        {underContractProperties.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Under Contract Properties</h2>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {underContractProperties.slice(0, 10).map((property) => (
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
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                          {cleanStatusText(property.StandardStatus)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Team Management Modals */}
        {showAgentManager && (
          <AdminAgentManager onClose={() => setShowAgentManager(false)} />
        )}

        {showOfficeStaffManager && (
          <AdminOfficeStaffManager onClose={() => setShowOfficeStaffManager(false)} />
        )}
      </div>
    </div>
  );
  } catch (error) {
    console.error('AdminDashboard: Error rendering dashboard:', error);
    return (
      <div className="container-padding py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            <h2 className="text-lg font-semibold mb-2">Render Error</h2>
            <p>Failed to render admin dashboard: {(error as Error).message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }
} 