import apiService from './apiService';

const financeService = {
  getAccounts: (token) => apiService.get('/finance/accounts', token),
  getJournals: (token) => apiService.get('/finance/journals', token),
  createJournal: (data, token) => apiService.post('/finance/journals', data, token),
  getInvoices: (token) => apiService.get('/finance/invoices', token),
  createInvoice: (data, token) => apiService.post('/finance/invoices', data, token),
  getCashBook: (type, token) => apiService.get(`/finance/cashbook/${type}`, token),
  getTrialBalance: (token) => apiService.get('/finance/trial-balance', token),
  getBalanceSheet: (token) => apiService.get('/finance/balance-sheet', token),
};

export default financeService;
