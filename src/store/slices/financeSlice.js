import { createSlice } from '@reduxjs/toolkit';

const financeSlice = createSlice({
  name: 'finance',
  initialState: {
    accounts: [],
    journals: [],
    invoices: [],
    cashBooks: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart: (state) => { state.loading = true; state.error = null; },
    fetchAccountsSuccess: (state, action) => { state.loading = false; state.accounts = action.payload; },
    fetchJournalsSuccess: (state, action) => { state.loading = false; state.journals = action.payload; },
    fetchInvoicesSuccess: (state, action) => { state.loading = false; state.invoices = action.payload; },
    fetchCashBooksSuccess: (state, action) => { state.loading = false; state.cashBooks = action.payload; },
    fetchFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    addJournal: (state, action) => { state.journals.unshift(action.payload); },
    addInvoice: (state, action) => { state.invoices.unshift(action.payload); },
  },
});

export const { fetchStart, fetchAccountsSuccess, fetchJournalsSuccess, fetchInvoicesSuccess, fetchCashBooksSuccess, fetchFailure, addJournal, addInvoice } = financeSlice.actions;
export default financeSlice.reducer;
