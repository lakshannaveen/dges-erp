import apiService from './apiService';

export const productionService = {
  getEWOs: (token) => apiService.get('/production/ewos', token),
  createEWO: (data, token) => apiService.post('/production/ewos', data, token),
  authorizeEWO: (id, token) => apiService.put(`/production/ewos/${id}/authorize`, {}, token),
  getMaterialOrders: (token) => apiService.get('/production/material-orders', token),
  getPettyCash: (token) => apiService.get('/production/petty-cash', token),
  createPettyCash: (data, token) => apiService.post('/production/petty-cash', data, token),
};

export const commercialService = {
  getSalesInvoices: (token) => apiService.get('/commercial/invoices', token),
  createInvoice: (data, token) => apiService.post('/commercial/invoices', data, token),
  authorizeInvoice: (id, token) => apiService.put(`/commercial/invoices/${id}/authorize`, {}, token),
  getProjects: (token) => apiService.get('/commercial/projects', token),
  createProject: (data, token) => apiService.post('/commercial/projects', data, token),
  getPriceLists: (token) => apiService.get('/commercial/price-lists', token),
};

export const subcontractService = {
  getContractors: (token) => apiService.get('/subcontract/contractors', token),
  createContractor: (data, token) => apiService.post('/subcontract/contractors', data, token),
  getContractorEmployees: (token) => apiService.get('/subcontract/employees', token),
  createContractorEmployee: (data, token) => apiService.post('/subcontract/employees', data, token),
};
