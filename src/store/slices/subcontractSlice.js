import { createSlice } from '@reduxjs/toolkit';

const subcontractSlice = createSlice({
  name: 'subcontract',
  initialState: {
    contractors: [],
    contractorEmployees: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => { state.loading = true; state.error = null; },
    fetchContractorsSuccess: (state, action) => { state.loading = false; state.contractors = action.payload; },
    fetchContractorEmployeesSuccess: (state, action) => { state.loading = false; state.contractorEmployees = action.payload; },
    fetchFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    addContractor: (state, action) => { state.contractors.unshift(action.payload); },
  },
});

export const { fetchStart, fetchContractorsSuccess, fetchContractorEmployeesSuccess, fetchFailure, addContractor } = subcontractSlice.actions;
export default subcontractSlice.reducer;
