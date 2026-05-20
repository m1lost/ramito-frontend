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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <div className="wrapper d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-grow-1 pt-5 mt-4">
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roles"
                element={
                  <ProtectedRoute>
                    <Roles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category"
                element={
                  <ProtectedRoute>
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
                  <ProtectedRoute>
                    <PaymentMethod />
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
