import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import dashboardReducer from './slices/dashboardSlice';
import assetReducer from './slices/assetSlice';
import hrReducer from './slices/hrSlice';
import financeReducer from './slices/financeSlice';
import procurementReducer from './slices/procurementSlice';
import productionReducer from './slices/productionSlice';
import commercialReducer from './slices/commercialSlice';
import subcontractReducer from './slices/subcontractSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    dashboard: dashboardReducer,
    asset: assetReducer,
    hr: hrReducer,
    finance: financeReducer,
    procurement: procurementReducer,
    production: productionReducer,
    commercial: commercialReducer,
    subcontract: subcontractReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
