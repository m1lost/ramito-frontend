import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-top py-3 mt-4 bg-light">
      <div className="container-fluid px-4">
        <Row className="align-items-center">
          <Col md={4}>
            <p className="mb-0 text-muted">&copy; 2026 RAMITO Company, Inc</p>
          </Col>

          <Col md={4} className="text-center">
            <Link to="/" className="text-decoration-none">
              <i className="bi bi-bootstrap-fill fs-3"></i>
            </Link>
          </Col>

          <Col md={4}>
            <Nav className="justify-content-end">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
