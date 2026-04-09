import { fetchStart, fetchInvoicesSuccess, fetchProjectsSuccess, fetchPriceListsSuccess, fetchFailure, addInvoice, addProject } from '../slices/commercialSlice';

const mockSalesInvoices = [
  { id: 'SI-2024-0089', client: 'Sri Lanka Navy', jobNo: 'JOB-4521', type: 'Marine Paint', amount: 8500000, date: '2024-03-15', status: 'Authorized', authorized: true },
  { id: 'SI-2024-0088', client: 'SLPA', jobNo: 'JOB-4508', type: 'Civil Works', amount: 3200000, date: '2024-03-12', status: 'Draft', authorized: false },
  { id: 'SI-2024-0087', client: 'Ceylon Shipping', jobNo: 'JOB-4490', type: 'Auto Paint', amount: 1800000, date: '2024-03-10', status: 'Sent', authorized: true },
  { id: 'SI-2024-0086', client: 'National Aquatic Resources', jobNo: 'JOB-4485', type: 'Marine Paint', amount: 4100000, date: '2024-03-08', status: 'Paid', authorized: true },
];

const mockProjects = [
  { id: 'PRJ-001', name: 'MV Samudra Dry Dock Refit', client: 'Sri Lanka Navy', proposalDate: '2024-02-01', value: 28500000, status: 'Active', manager: 'Eng. R. Perera' },
  { id: 'PRJ-002', name: 'SLPA Jetty Upgrade', client: 'SLPA', proposalDate: '2024-01-15', value: 15000000, status: 'Proposal', manager: 'Eng. K. Bandara' },
  { id: 'PRJ-003', name: 'Fleet Maintenance Contract', client: 'Ceylon Shipping', proposalDate: '2023-12-10', value: 42000000, status: 'Active', manager: 'Eng. S. Rajapaksa' },
];

const mockPriceLists = [
  { id: 'PL-001', service: 'Hull Blasting & Painting (per sqm)', unit: 'SqM', price: 4500, currency: 'LKR' },
  { id: 'PL-002', service: 'Propeller Polishing', unit: 'Job', price: 280000, currency: 'LKR' },
  { id: 'PL-003', service: 'Tank Cleaning & Coating', unit: 'Cubic M', price: 8500, currency: 'LKR' },
  { id: 'PL-004', service: 'Welding Works (per hour)', unit: 'Hour', price: 3500, currency: 'LKR' },
];

export const fetchSalesInvoices = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchInvoicesSuccess(mockSalesInvoices)), 500);
};

export const fetchProjects = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchProjectsSuccess(mockProjects)), 500);
};

export const fetchPriceLists = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchPriceListsSuccess(mockPriceLists)), 500);
};
