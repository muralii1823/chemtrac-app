import axios from 'axios';
import type { Test } from '../types';

// Use environment variable for API URL, fallback to /api for local development
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
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
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
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

