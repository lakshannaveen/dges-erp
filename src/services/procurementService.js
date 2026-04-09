import apiService from './apiService';

const procurementService = {
  getSuppliers: (token) => apiService.get('/procurement/suppliers', token),
  createSupplier: (data, token) => apiService.post('/procurement/suppliers', data, token),
  getStock: (token) => apiService.get('/procurement/stock', token),
  getOrders: (token) => apiService.get('/procurement/orders', token),
  createOrder: (data, token) => apiService.post('/procurement/orders', data, token),
  getBondWarehouse: (token) => apiService.get('/procurement/bond-warehouse', token),
  getMOCTracking: (token) => apiService.get('/procurement/moc-tracking', token),
};

export default procurementService;
