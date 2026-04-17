import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerDriver = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');
export const updateMe = (data) => API.put('/auth/me', data);

// Drivers (admin)
export const getAllDrivers = () => API.get('/drivers');
export const getDriverById = (id) => API.get(`/drivers/${id}`);
export const updateDriverStatus = (id, status) => API.put(`/drivers/${id}/status`, { status });
export const deleteDriver = (id) => API.delete(`/drivers/${id}`);

// Loads
export const getLoads = () => API.get('/loads');
export const getLoadById = (id) => API.get(`/loads/${id}`);
export const createLoad = (data) => API.post('/loads', data);
export const assignDriver = (loadId, driverId, notes, estimatedArrival) =>
  API.put(`/loads/${loadId}/assign`, { driverId, notes, estimatedArrival });
export const updateLoadStatus = (id, status) => API.put(`/loads/${id}/status`, { status });
export const deleteLoad = (id) => API.delete(`/loads/${id}`);

// Quotes
export const submitQuote = (data) => API.post('/quotes', data);
export const getAllQuotes = () => API.get('/quotes');
export const updateQuote = (id, data) => API.put(`/quotes/${id}`, data);
export const deleteQuote = (id) => API.delete(`/quotes/${id}`);

// Dispatch
export const getAllDispatches = () => API.get('/dispatch');
export const getMyDispatches = () => API.get('/dispatch/my');
export const updateDispatchStatus = (id, status, currentLocation) =>
  API.put(`/dispatch/${id}/status`, { status, currentLocation });

// Dashboard
export const getDashboardStats = () => API.get('/dashboard/stats');

export default API;
