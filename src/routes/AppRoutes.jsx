import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

// Auth Pages
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Login/RegisterPage';

// Main Pages
import Dashboard from '../pages/Dashboard/Dashboard';
import PartList from '../pages/Parts/PartList';
import AddPart from '../pages/Parts/AddPart';
import EditPart from '../pages/Parts/EditPart';
import OrderList from '../pages/Orders/OrderList';
import AddOrder from '../pages/Orders/AddOrder';
import OrderDetails from '../pages/Orders/OrderDetails';
import SupplierList from '../pages/Suppliers/SupplierList';
import AddSupplier from '../pages/Suppliers/AddSupplier';
import EditSupplier from '../pages/Suppliers/EditSupplier';
import Reports from '../pages/Reports/Reports';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Parts Routes */}
      <Route
        path="/parts"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PartList />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/parts/add"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AddPart />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/parts/edit/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <EditPart />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Orders Routes */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MainLayout>
              <OrderList />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/add"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AddOrder />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <OrderDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Suppliers Routes */}
      <Route
        path="/suppliers"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SupplierList />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers/add"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AddSupplier />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers/edit/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <EditSupplier />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Reports Route */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
