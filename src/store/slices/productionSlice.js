import { createSlice } from '@reduxjs/toolkit';

const productionSlice = createSlice({
  name: 'production',
  initialState: {
    ewoList: [],
    materialOrders: [],
    pettyCash: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => { state.loading = true; state.error = null; },
    fetchEWOSuccess: (state, action) => { state.loading = false; state.ewoList = action.payload; },
    fetchMaterialSuccess: (state, action) => { state.loading = false; state.materialOrders = action.payload; },
    fetchPettyCashSuccess: (state, action) => { state.loading = false; state.pettyCash = action.payload; },
    fetchFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    addEWO: (state, action) => { state.ewoList.unshift(action.payload); },
  },
});

export const { fetchStart, fetchEWOSuccess, fetchMaterialSuccess, fetchPettyCashSuccess, fetchFailure, addEWO } = productionSlice.actions;
export default productionSlice.reducer;
