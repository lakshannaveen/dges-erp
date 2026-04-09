import { createSlice } from '@reduxjs/toolkit';

const procurementSlice = createSlice({
  name: 'procurement',
  initialState: {
    suppliers: [],
    stockItems: [],
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => { state.loading = true; state.error = null; },
    fetchSuppliersSuccess: (state, action) => { state.loading = false; state.suppliers = action.payload; },
    fetchStockSuccess: (state, action) => { state.loading = false; state.stockItems = action.payload; },
    fetchOrdersSuccess: (state, action) => { state.loading = false; state.orders = action.payload; },
    fetchFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    addSupplier: (state, action) => { state.suppliers.unshift(action.payload); },
    addOrder: (state, action) => { state.orders.unshift(action.payload); },
  },
});

export const { fetchStart, fetchSuppliersSuccess, fetchStockSuccess, fetchOrdersSuccess, fetchFailure, addSupplier, addOrder } = procurementSlice.actions;
export default procurementSlice.reducer;
