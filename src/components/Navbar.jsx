import React, { useEffect } from 'react';
import { Navbar as BSNavbar, Container, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../features/users/usersSlice';

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.users.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && !profile) {
      dispatch(getProfile());
    }
  }, [token, profile, dispatch]);

  const roles = profile?.Roles?.map((r) => r.name.toLowerCase()) || [];
  const isUser = roles.includes('user');

  console.log(profile);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <BSNavbar bg="dark" variant="dark" fixed="top">
      <div className="container-fluid px-4">
        <BSNavbar.Brand href="/">RAMITO</BSNavbar.Brand>
        <Nav className="me-auto">
          {token ? null : (
            <>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </>
          )}

          {token ? (
            <>
              <Nav.Link href="/dashboard">
                Dashboard {console.log(roles)}
              </Nav.Link>

              {isUser ? null : (
                <>
                  <Nav.Link href="/users">Users</Nav.Link>
                  <Nav.Link href="/category">Categories</Nav.Link>
                  <Nav.Link href="/payment-method">Payment Methods</Nav.Link>
                </>
              )}

              <Nav.Link href="/product">Products</Nav.Link>
              <Nav.Link href="/order">Orders</Nav.Link>
            </>
          ) : null}
        </Nav>
        <Nav>
          {token ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
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
