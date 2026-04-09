import apiService from './apiService';

const authService = {
  login: (credentials) => apiService.post('/auth/login', credentials),
  logout: (token) => apiService.post('/auth/logout', {}, token),
  refreshToken: (token) => apiService.post('/auth/refresh', {}, token),
  getProfile: (token) => apiService.get('/auth/profile', token),
};

export default authService;
