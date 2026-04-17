import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import GetQuote from './pages/public/GetQuote';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Driver Pages
import DriverDashboard from './pages/driver/DriverDashboard';
import DriverLoads from './pages/driver/DriverLoads';
import DriverDispatches from './pages/driver/DriverDispatches';
import DriverProfile from './pages/driver/DriverProfile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDrivers from './pages/admin/AdminDrivers';
import AdminLoads from './pages/admin/AdminLoads';
import AdminQuotes from './pages/admin/AdminQuotes';
import AdminDispatches from './pages/admin/AdminDispatches';
import AdminManagement from './pages/admin/AdminManagement';

// Layouts
import Navbar from './components/common/Navbar';
import AdminLayout from './components/admin/AdminLayout';
import DriverLayout from './components/driver/DriverLayout';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/services" element={<><Navbar /><Services /></>} />
        <Route path="/get-quote" element={<><Navbar /><GetQuote /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Driver Routes */}
        <Route path="/driver" element={
          <PrivateRoute role="driver">
            <DriverLayout />
          </PrivateRoute>
        }>
          <Route index element={<DriverDashboard />} />
          <Route path="loads" element={<DriverLoads />} />
          <Route path="dispatches" element={<DriverDispatches />} />
          <Route path="profile" element={<DriverProfile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <PrivateRoute role="admin">
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="drivers" element={<AdminDrivers />} />
          <Route path="loads" element={<AdminLoads />} />
          <Route path="quotes" element={<AdminQuotes />} />
          <Route path="dispatches" element={<AdminDispatches />} />
          <Route path="admins" element={<AdminManagement />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
