import { createSlice } from '@reduxjs/toolkit';

const commercialSlice = createSlice({
  name: 'commercial',
  initialState: {
    salesInvoices: [],
    projects: [],
    priceLists: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => { state.loading = true; state.error = null; },
    fetchInvoicesSuccess: (state, action) => { state.loading = false; state.salesInvoices = action.payload; },
    fetchProjectsSuccess: (state, action) => { state.loading = false; state.projects = action.payload; },
    fetchPriceListsSuccess: (state, action) => { state.loading = false; state.priceLists = action.payload; },
    fetchFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    addInvoice: (state, action) => { state.salesInvoices.unshift(action.payload); },
    addProject: (state, action) => { state.projects.unshift(action.payload); },
  },
});

export const { fetchStart, fetchInvoicesSuccess, fetchProjectsSuccess, fetchPriceListsSuccess, fetchFailure, addInvoice, addProject } = commercialSlice.actions;
export default commercialSlice.reducer;
