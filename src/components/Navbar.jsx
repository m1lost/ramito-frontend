import React from 'react';
import { Navbar as BSNavbar, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let roles = [];
  let userEmail = '';

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));

      roles = decoded.roles?.map((r) => r.toLowerCase()) || [];
      userEmail = decoded.email || '';
    } catch (error) {
      roles = [];
      userEmail = '';
    }
  }

  const isAdmin = roles.includes('admin');
  const isStaff = roles.includes('staff');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <BSNavbar bg="dark" variant="dark" fixed="top">
      <div className="container-fluid px-4">
        <BSNavbar.Brand href="/">RAMITO</BSNavbar.Brand>
        <Nav className="me-auto">
          {!token ? (
            <>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>

              {(isAdmin || isStaff) && (
                <>
                  <Nav.Link href="/users">Users</Nav.Link>
                  <Nav.Link href="/category">Categories</Nav.Link>
                  <Nav.Link href="/payment-method">Payment Methods</Nav.Link>
                </>
              )}

              <Nav.Link href="/product">Products</Nav.Link>
              <Nav.Link href="/order">Orders</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {token ? (
            <div>
              <span className="text-white">Selamat Datang, {userEmail} </span>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </div>
    </BSNavbar>
  );
}
