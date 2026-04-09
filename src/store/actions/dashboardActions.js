import { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure, setRecentActivities } from '../slices/dashboardSlice';

export const fetchDashboardStats = () => (dispatch) => {
  dispatch(fetchStatsStart());
  setTimeout(() => {
    dispatch(fetchStatsSuccess({
      totalEmployees: 1248,
      activeProjects: 34,
      pendingInvoices: 87,
      monthlyRevenue: 4820000,
    }));
    dispatch(setRecentActivities([
      { id: 1, type: 'invoice', message: 'Sales Invoice #INV-2024-0891 created', user: 'Finance Dept', time: '5 min ago', module: 'Commercial' },
      { id: 2, type: 'hr', message: 'New employee EMP-1249 registered', user: 'HR Dept', time: '22 min ago', module: 'HRM' },
      { id: 3, type: 'asset', message: 'Asset Transfer Note ATN-0034 approved', user: 'Asset Mgr', time: '1 hr ago', module: 'Asset' },
      { id: 4, type: 'production', message: 'EWO-2024-0178 authorized & certified', user: 'Production', time: '2 hr ago', module: 'Production' },
      { id: 5, type: 'procurement', message: 'Stock balance updated for Store #3', user: 'Procurement', time: '3 hr ago', module: 'Procurement' },
      { id: 6, type: 'finance', message: 'Month end routine completed for Feb 2024', user: 'Finance', time: '4 hr ago', module: 'Finance' },
    ]));
  }, 600);
};
