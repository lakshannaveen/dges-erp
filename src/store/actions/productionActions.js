import { fetchStart, fetchEWOSuccess, fetchMaterialSuccess, fetchPettyCashSuccess, fetchFailure, addEWO } from '../slices/productionSlice';

const mockEWO = [
  { id: 'EWO-2024-0178', jobNo: 'JOB-4521', description: 'Hull cleaning & painting - MV Samudra', type: 'Production', amount: 4200000, status: 'Authorized', createdDate: '2024-03-01', dueDate: '2024-03-20' },
  { id: 'EWO-2024-0177', jobNo: 'JOB-4520', description: 'Propeller shaft replacement', type: 'Production', amount: 2800000, status: 'Pending', createdDate: '2024-02-28', dueDate: '2024-03-15' },
  { id: 'EWO-2024-0176', jobNo: 'JOB-4519', description: 'Office renovation - Block C', type: 'Non Production', amount: 680000, status: 'Certified', createdDate: '2024-02-25', dueDate: '2024-03-10' },
  { id: 'EWO-2024-0175', jobNo: 'JOB-4518', description: 'Engine room maintenance', type: 'Production', amount: 1500000, status: 'Authorized', createdDate: '2024-02-20', dueDate: '2024-03-05' },
];

const mockMaterial = [
  { id: 'MOC-P-001', ewoRef: 'EWO-2024-0178', material: 'Anti-Corrosion Primer', qty: 200, unit: 'LTR', reqDate: '2024-03-05', status: 'Issued' },
  { id: 'MOC-P-002', ewoRef: 'EWO-2024-0177', material: 'MS Plate 12mm', qty: 500, unit: 'KG', reqDate: '2024-03-08', status: 'Pending' },
  { id: 'MOC-P-003', ewoRef: 'EWO-2024-0176', material: 'Paint - Interior White', qty: 50, unit: 'LTR', reqDate: '2024-03-02', status: 'Issued' },
];

const mockPettyCash = [
  { id: 'PCR-001', requestedBy: 'Kasun Silva', amount: 25000, purpose: 'Site transport & logistics', date: '2024-03-15', status: 'Approved' },
  { id: 'PCR-002', requestedBy: 'Thilak Jayasena', amount: 12500, purpose: 'Emergency tool purchase', date: '2024-03-17', status: 'Pending' },
];

export const fetchEWOs = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchEWOSuccess(mockEWO)), 500);
};

export const fetchMaterialOrders = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchMaterialSuccess(mockMaterial)), 500);
};

export const fetchPettyCash = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchPettyCashSuccess(mockPettyCash)), 500);
};

export const createEWO = (data) => (dispatch) => {
  const ewo = { id: `EWO-${Date.now()}`, ...data, status: 'Pending' };
  dispatch(addEWO(ewo));
  return Promise.resolve(ewo);
};
