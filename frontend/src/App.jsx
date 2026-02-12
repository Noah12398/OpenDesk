import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MapDiscovery from './pages/MapDiscovery';
import ResourceDetail from './pages/ResourceDetail';
import AddResource from './pages/AddResource';
import AdminDashboard from './pages/AdminDashboard';
import EmergencyHelp from './pages/EmergencyHelp';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Main app routes with layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="map" element={<MapDiscovery />} />
          <Route path="resource/:id" element={<ResourceDetail />} />
          <Route path="add-resource" element={<AddResource />} />
          <Route 
            path="admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="emergency" element={<EmergencyHelp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
