import { fetchStart, fetchContractorsSuccess, fetchContractorEmployeesSuccess, fetchFailure, addContractor } from '../slices/subcontractSlice';

const mockContractors = [
  { id: 'CON-001', company: 'Weerasinghe Construction', registration: 'REG-2019-0045', contact: 'Mr. P. Weerasinghe', phone: '0712233445', type: 'Civil Works', status: 'Active' },
  { id: 'CON-002', company: 'TechFab Engineers', registration: 'REG-2020-0112', contact: 'Mr. S. Gunasekara', phone: '0723344556', type: 'Fabrication', status: 'Active' },
  { id: 'CON-003', company: 'Marine Services (Pvt) Ltd', registration: 'REG-2018-0033', contact: 'Ms. N. Siriwardena', phone: '0734455667', type: 'Marine', status: 'Inactive' },
];

const mockContractorEmployees = [
  { id: 'CE-001', contractorId: 'CON-001', name: 'Sunil Ranatunga', designation: 'Site Supervisor', nic: '198801234567', phone: '0771122334', status: 'Active' },
  { id: 'CE-002', contractorId: 'CON-001', name: 'Mahinda Gamage', designation: 'Mason', nic: '199002345678', phone: '0782233445', status: 'Active' },
  { id: 'CE-003', contractorId: 'CON-002', name: 'Pradeep Kumara', designation: 'Fabricator', nic: '198503456789', phone: '0793344556', status: 'Active' },
];

export const fetchContractors = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchContractorsSuccess(mockContractors)), 500);
};

export const fetchContractorEmployees = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchContractorEmployeesSuccess(mockContractorEmployees)), 500);
};

export const createContractor = (data) => (dispatch) => {
  const c = { id: `CON-${Date.now()}`, ...data, status: 'Active' };
  dispatch(addContractor(c));
  return Promise.resolve(c);
};
