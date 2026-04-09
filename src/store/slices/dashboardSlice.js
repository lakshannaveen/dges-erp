import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      totalEmployees: 1248,
      activeProjects: 34,
      pendingInvoices: 87,
      monthlyRevenue: 4820000,
    },
    recentActivities: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStatsStart: (state) => { state.loading = true; },
    fetchStatsSuccess: (state, action) => { state.loading = false; state.stats = action.payload; },
    fetchStatsFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    setRecentActivities: (state, action) => { state.recentActivities = action.payload; },
  },
});

export const { fetchStatsStart, fetchStatsSuccess, fetchStatsFailure, setRecentActivities } = dashboardSlice.actions;
export default dashboardSlice.reducer;
