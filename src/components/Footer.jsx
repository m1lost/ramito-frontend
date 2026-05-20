import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      className="border-top py-3 mt-4 bg-light"
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%'
      }}
    >
      <div className="container-fluid px-4">
        <Row className="align-items-center">
          <Col md={4}>
            <p className="mb-0 text-muted">&copy; 2026 RAMITO Company, Inc</p>
          </Col>

          <Col md={4} className="text-center">
            <Link to="/" className="text-decoration-none">
              <h4 className="mb-0">RAMITO Mitra Toko</h4>
            </Link>
          </Col>

          <Col md={4}>
            <Nav className="justify-content-end">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
