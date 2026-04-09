import apiService from './apiService';

const assetService = {
  getAll: (token) => apiService.get('/assets', token),
  getById: (id, token) => apiService.get(`/assets/${id}`, token),
  create: (data, token) => apiService.post('/assets', data, token),
  update: (id, data, token) => apiService.put(`/assets/${id}`, data, token),
  delete: (id, token) => apiService.delete(`/assets/${id}`, token),
  getTransfers: (token) => apiService.get('/assets/transfers', token),
  createTransfer: (data, token) => apiService.post('/assets/transfers', data, token),
  getDisposals: (token) => apiService.get('/assets/disposals', token),
  createDisposal: (data, token) => apiService.post('/assets/disposals', data, token),
};

export default assetService;
