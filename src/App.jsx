import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Categories from './pages/Categories';
import Products from './pages/Products';
import PaymentMethod from './pages/PaymentMehtod';
import Order from './pages/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <>
      <div className="wrapper d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1 pt-5 mt-4 pb-4 mb-5">
          <div className="container-fluid px-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'staff']}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roles"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'staff']}>
                    <Roles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'staff']}>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-method"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'staff']}>
                    <PaymentMethod />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
