import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Task API
export const taskAPI = {
  getAll: () => api.get('/tasks/'),
  create: (data) => api.post('/tasks/', data),
  update: (id, data) => api.put(`/tasks/${id}/`, data),
  delete: (id) => api.delete(`/tasks/${id}/`),
  toggle: (id) => api.patch(`/tasks/${id}/`, { done: true }), // Example
  pending: () => api.get('/tasks/pending/'),
  completed: () => api.get('/tasks/completed/'),
};

// Q&A API
export const qaAPI = {
  getAll: () => api.get('/qa/'),
  ask: (question) => api.post('/qa/ask/', { question }),
  search: (query) => api.get(`/qa/search/?q=${query}`),
};

// Goals API
export const goalAPI = {
  getAll: () => api.get('/goals/'),
  create: (data) => api.post('/goals/', data),
  update: (id, data) => api.put(`/goals/${id}/`, data),
  delete: (id) => api.delete(`/goals/${id}/`),
  active: () => api.get('/goals/active/'),
  updateProgress: (id, progress) => api.post(`/goals/${id}/update_progress/`, { progress }),
};

export default api;