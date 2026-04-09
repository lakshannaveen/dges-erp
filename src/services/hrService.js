import apiService from './apiService';

const hrService = {
  getEmployees: (token) => apiService.get('/hr/employees', token),
  getEmployee: (id, token) => apiService.get(`/hr/employees/${id}`, token),
  createEmployee: (data, token) => apiService.post('/hr/employees', data, token),
  updateEmployee: (id, data, token) => apiService.put(`/hr/employees/${id}`, data, token),
  getAttendance: (token) => apiService.get('/hr/attendance', token),
  markAttendance: (data, token) => apiService.post('/hr/attendance', data, token),
  getTimeAdjustments: (token) => apiService.get('/hr/time-adjustments', token),
  createTimeAdjustment: (data, token) => apiService.post('/hr/time-adjustments', data, token),
};

export default hrService;
