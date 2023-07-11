import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            NoteClouds
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                className={`${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                className={`${location.pathname === '/about' ? 'active' : ''}`}
              >
                About
              </Nav.Link>
            </Nav>
            {!localStorage.getItem('authtoken') ? (
              <Form className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </Form>
            ) : (
              <Form>
                <Button
                  className="mx-2"
                  variant="primary"
                  role="button"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
