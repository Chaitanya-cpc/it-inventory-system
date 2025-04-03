import axios from 'axios';

// Use hardcoded API URL for development
// In production, this would use process.env.NEXT_PUBLIC_API_URL
const API_URL = 'http://localhost:8000/api';

// ===== TRON SYSTEM INTERFACES =====
interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  // Add other user fields as needed
}

// ===== LOCAL STORAGE FUNCTIONS =====
// Store auth tokens in local storage
const storeTokens = (tokens: AuthTokens): void => {
  localStorage.setItem('accessToken', tokens.access);
  localStorage.setItem('refreshToken', tokens.refresh);
  // Set token expiry time (usually 15 minutes for JWT)
  const expiryTime = new Date(new Date().getTime() + 15 * 60 * 1000);
  localStorage.setItem('tokenExpiry', expiryTime.toISOString());
};

// Remove tokens from local storage on logout
const removeTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('user');
};

// Get access token from local storage
const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// Get refresh token from local storage
const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

// Store user data in local storage
const storeUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data from local storage
const getUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ===== AUTHENTICATION FUNCTIONS =====
// Log in user and get tokens
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    // Access TRON mainframe
    const response = await axios.post(`${API_URL}/auth/login/`, credentials);
    const { user, tokens } = response.data;
    
    // Initialize user identity disk (store tokens)
    storeTokens(tokens);
    storeUser(user);
    
    return user;
  } catch (error) {
    console.error('IDENTITY AUTHENTICATION FAILURE:', error);
    throw new Error('Login failed. Invalid username or password.');
  }
};

// Register new user
export const register = async (userData: any): Promise<User> => {
  try {
    // Create new identity disk
    const response = await axios.post(`${API_URL}/auth/register/`, userData);
    const { user, tokens } = response.data;
    
    // Initialize user access
    storeTokens(tokens);
    storeUser(user);
    
    return user;
  } catch (error) {
    console.error('IDENTITY CREATION FAILURE:', error);
    throw new Error('Registration failed. Please try a different username or check your data.');
  }
};

// Log out user
export const logout = (): void => {
  try {
    // Deactivate identity disk
    removeTokens();
    // Redirect to login portal
    window.location.href = '/login';
  } catch (error) {
    console.error('LOGOUT SYSTEM ERROR:', error);
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  // Check for active identity disk
  const token = getAccessToken();
  const user = getUser();
  
  if (!token || !user) return false;
  
  // Check token expiry
  const expiry = localStorage.getItem('tokenExpiry');
  if (expiry && new Date(expiry) < new Date()) {
    // Token expired, attempt to refresh
    refreshAccessToken().catch(() => {
      // If refresh fails, log out
      removeTokens();
      return false;
    });
  }
  
  return true;
};

// Refresh access token using refresh token
export const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    // Renew identity disk
    const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
      refresh: refreshToken
    });
    
    const newAccessToken = response.data.access;
    
    // Update token storage
    localStorage.setItem('accessToken', newAccessToken);
    
    // Set new expiry
    const expiryTime = new Date(new Date().getTime() + 15 * 60 * 1000);
    localStorage.setItem('tokenExpiry', expiryTime.toISOString());
    
    return newAccessToken;
  } catch (error) {
    console.error('TOKEN REFRESH FAILURE:', error);
    removeTokens(); // Clean up if refresh fails
    throw new Error('Unable to refresh authentication. Please log in again.');
  }
};

// ===== AXIOS INSTANCE WITH INTERCEPTORS =====
// Create an axios instance with authorization headers
export const authAxios = axios.create({
  baseURL: API_URL
});

// Add request interceptor to include auth token
authAxios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const newToken = await refreshAccessToken();
        
        // Retry the original request with new token
        if (originalRequest && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return authAxios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        console.error('IDENTITY DISK SYNCHRONIZATION FAILURE:', refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default {
  login,
  register,
  logout,
  isAuthenticated,
  refreshAccessToken,
  authAxios,
  getUser
}; 