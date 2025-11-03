import axios from 'axios';
import type { Test } from '../types';

// Use environment variable for API URL, fallback to Render backend for production
// In production (Vercel), VITE_API_URL should be set to the Render backend URL
// For local dev, use '/api' which will proxy or use http://localhost:8000
function getApiUrl(): string {
  // If explicitly set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // If running in browser and not localhost, assume production (Vercel)
  if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
    return 'https://chemtrac-app.onrender.com/api';
  }
  
  // Local development fallback
  return '/api';
}

const API_URL = getApiUrl();

// Normalize API URL - remove trailing slash and ensure we have the base URL
// If API_URL already includes /api, use it; otherwise don't add /api here
// We'll handle path joining in the routes
let normalizedApiUrl: string;
if (API_URL.endsWith('/api')) {
  normalizedApiUrl = API_URL;
} else if (API_URL.endsWith('/api/')) {
  normalizedApiUrl = API_URL.slice(0, -1); // Remove trailing slash
} else {
  // For local dev, API_URL is '/api', keep it
  normalizedApiUrl = API_URL;
}

console.log('API Base URL:', normalizedApiUrl);
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: normalizedApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    // Ensure baseURL is set correctly
    if (!config.baseURL) {
      console.error('ERROR: baseURL is not set!', config);
      config.baseURL = normalizedApiUrl;
    }
    // Construct full URL properly - axios handles this, but let's verify
    const fullUrl = config.baseURL && config.url 
      ? `${config.baseURL}${config.url.startsWith('/') ? '' : '/'}${config.url}`
      : config.url || 'unknown';
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      baseURL: config.baseURL,
      url: config.url,
      fullUrl: fullUrl
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    const message = error.response?.data?.detail || error.message;
    const status = error.response?.status;
    const url = error.config?.url;
    
    console.error('API Response Error:', {
      status,
      message,
      url: error.config ? `${error.config.baseURL}${url}` : 'unknown',
      error: error.message,
    });
    
    // Provide more helpful error messages
    if (!error.response) {
      console.error('Network error - backend might be unreachable. Check:', normalizedApiUrl);
    }
    
    return Promise.reject(error);
  }
);

export const testApi = {
  getAll: async (): Promise<Test[]> => {
    // Use /tests path - axios will join with baseURL
    // baseURL: https://chemtrac-app.onrender.com/api
    // path: /tests
    // Result: https://chemtrac-app.onrender.com/api/tests
    const response = await api.get<Test[]>('/tests');
    return response.data;
  },

  getById: async (id: number): Promise<Test> => {
    const response = await api.get<Test>(`/tests/${id}`);
    return response.data;
  },

  create: async (test: Omit<Test, 'id' | 'createdAt'>): Promise<Test> => {
    const response = await api.post<Test>('/tests', test);
    return response.data;
  },

  update: async (id: number, test: Partial<Test>): Promise<Test> => {
    const response = await api.put<Test>(`/tests/${id}`, test);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tests/${id}`);
  },
};

export default api;

