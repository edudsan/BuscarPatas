import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { NavLinks } from './NavLinks'
import './Header.css'

export function Header() {
  return (
    <Navbar className="custom-header" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            className="header-logo"
            src="/src/assets/logo.png"
            alt="logo Buscar Patas"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLinks />
          </Nav>

          <Nav className="align-items-center">
            <Button
              as={Link}
              to="/cadastro"
              className="btn-register me-3 px-3 py-2"
            >
              Cadastre-se
            </Button>

            <Button as={Link} to="/login" className="btn-login px-3 py-2">
              Entrar
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
