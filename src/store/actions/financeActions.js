import { fetchStart, fetchAccountsSuccess, fetchJournalsSuccess, fetchInvoicesSuccess, fetchCashBooksSuccess, fetchFailure, addJournal, addInvoice } from '../slices/financeSlice';

const mockAccounts = [
  { id: 'ACC-1000', name: 'Cash & Bank', type: 'Asset', balance: 18450000, currency: 'LKR' },
  { id: 'ACC-2000', name: 'Trade Receivables', type: 'Asset', balance: 34200000, currency: 'LKR' },
  { id: 'ACC-3000', name: 'Trade Payables', type: 'Liability', balance: 12800000, currency: 'LKR' },
  { id: 'ACC-4000', name: 'Revenue - Marine', type: 'Revenue', balance: 95600000, currency: 'LKR' },
  { id: 'ACC-4001', name: 'Revenue - Civil', type: 'Revenue', balance: 42100000, currency: 'LKR' },
  { id: 'ACC-5000', name: 'Operating Expenses', type: 'Expense', balance: 67300000, currency: 'LKR' },
];

const mockJournals = [
  { id: 'JNL-001', date: '2024-03-15', description: 'Monthly payroll allocation', debit: 8500000, credit: 8500000, status: 'Posted', createdBy: 'Finance Dept' },
  { id: 'JNL-002', date: '2024-03-12', description: 'Revenue recognition - Job #4521', debit: 4200000, credit: 4200000, status: 'Posted', createdBy: 'Finance Dept' },
  { id: 'JNL-003', date: '2024-03-10', description: 'Depreciation - Fixed Assets', debit: 1200000, credit: 1200000, status: 'Draft', createdBy: 'Finance Dept' },
];

const mockInvoices = [
  { id: 'INV-2024-0891', client: 'Sri Lanka Navy', amount: 8500000, dueDate: '2024-04-15', status: 'Pending', type: 'Marine Paint' },
  { id: 'INV-2024-0890', client: 'SLPA', amount: 3200000, dueDate: '2024-04-10', status: 'Paid', type: 'Civil Works' },
  { id: 'INV-2024-0889', client: 'Ceylon Shipping', amount: 1800000, dueDate: '2024-03-30', status: 'Overdue', type: 'Auto Paint' },
  { id: 'INV-2024-0888', client: 'Govt Dry Docks', amount: 12000000, dueDate: '2024-05-01', status: 'Draft', type: 'Marine Paint' },
];

const mockCashBooks = [
  { id: 'CB-001', date: '2024-03-18', description: 'Receipt from SLPA', type: 'Receipt', amount: 3200000, balance: 18450000 },
  { id: 'CB-002', date: '2024-03-17', description: 'Supplier payment - Steels Ltd', type: 'Payment', amount: 980000, balance: 15250000 },
  { id: 'CB-003', date: '2024-03-16', description: 'Petty cash disbursement', type: 'Payment', amount: 45000, balance: 16230000 },
];

export const fetchAccounts = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchAccountsSuccess(mockAccounts)), 500);
};

export const fetchJournals = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchJournalsSuccess(mockJournals)), 500);
};

export const fetchInvoices = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchInvoicesSuccess(mockInvoices)), 500);
};

export const fetchCashBooks = () => (dispatch) => {
  dispatch(fetchStart());
  setTimeout(() => dispatch(fetchCashBooksSuccess(mockCashBooks)), 500);
};

export const createJournal = (data) => (dispatch) => {
  const j = { id: `JNL-${Date.now()}`, ...data, status: 'Draft' };
  dispatch(addJournal(j));
  return Promise.resolve(j);
};
