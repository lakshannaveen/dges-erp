import { createSlice } from '@reduxjs/toolkit';

const assetSlice = createSlice({
  name: 'asset',
  initialState: {
    assets: [],
    transfers: [],
    disposals: [],
    loading: false,
    error: null,
    selectedAsset: null,
  },
  reducers: {
    fetchStart: (state) => { state.loading = true; state.error = null; },
    fetchAssetsSuccess: (state, action) => { state.loading = false; state.assets = action.payload; },
    fetchTransfersSuccess: (state, action) => { state.loading = false; state.transfers = action.payload; },
    fetchDisposalsSuccess: (state, action) => { state.loading = false; state.disposals = action.payload; },
    fetchFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    setSelectedAsset: (state, action) => { state.selectedAsset = action.payload; },
    addAsset: (state, action) => { state.assets.unshift(action.payload); },
    updateAsset: (state, action) => {
      const idx = state.assets.findIndex(a => a.id === action.payload.id);
      if (idx !== -1) state.assets[idx] = action.payload;
    },
    deleteAsset: (state, action) => { state.assets = state.assets.filter(a => a.id !== action.payload); },
  },
});

export const { fetchStart, fetchAssetsSuccess, fetchTransfersSuccess, fetchDisposalsSuccess, fetchFailure, setSelectedAsset, addAsset, updateAsset, deleteAsset } = assetSlice.actions;
export default assetSlice.reducer;
