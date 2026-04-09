import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AssetPage from '../pages/AssetPage';
import CommercialPage from '../pages/CommercialPage';
import FinancePage from '../pages/FinancePage';
import HRMPage from '../pages/HRMPage';
import { OfficePage } from '../pages/OfficePage';
import ProcurementPage from '../pages/ProcurementPage';
import ProductionPage from '../pages/ProductionPage';
import SubcontractPage from '../pages/SubcontractPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(s => s.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useSelector(s => s.auth);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/asset" element={<AssetPage />} />
                <Route path="/commercial" element={<CommercialPage />} />
                <Route path="/finance" element={<FinancePage />} />
                <Route path="/hrm" element={<HRMPage />} />
                <Route path="/office" element={<OfficePage />} />
                <Route path="/procurement" element={<ProcurementPage />} />
                <Route path="/production" element={<ProductionPage />} />
                <Route path="/subcontract" element={<SubcontractPage />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
