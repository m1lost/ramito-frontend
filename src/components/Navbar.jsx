import React from 'react';
import { Navbar as BSNavbar, Container, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <BSNavbar bg="dark" variant="dark" fixed="top">
      <Container>
        <BSNavbar.Brand href="/">RAMITO</BSNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {token ? (
            <>
              <Nav.Link href="/users">Users</Nav.Link>
              <Nav.Link href="/category">Categories</Nav.Link>
              <Nav.Link href="/product">Products</Nav.Link>
              <Nav.Link href="/payment-methods">Payment Methods</Nav.Link>
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
      </Container>
    </BSNavbar>
  );
}
