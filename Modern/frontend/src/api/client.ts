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

console.log('API Base URL:', normalizedApiUrl);
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

// Ensure baseURL ends with /api for proper path joining
const normalizedApiUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

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
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log('API Request:', config.method?.toUpperCase(), fullUrl);
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

