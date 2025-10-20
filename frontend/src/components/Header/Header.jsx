import { useState } from 'react'
import {
  Navbar,
  Container,
  Nav,
  Button,
  Dropdown,
  Badge,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../contexts/AuthContext'
import { NavLinks } from './NavLinks'
import './Header.css'
import '../../styles/global.css'

export function Header() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <Navbar
        className="custom-header"
        variant="dark"
        expand="lg"
        sticky="top"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              className="header-logo"
              src="/src/assets/logo.png"
              alt="logo Buscar Patas"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" className="nav-container">
            <Nav className="mx-auto">
              <NavLinks onNavLinkClick={() => setExpanded(false)} />
            </Nav>

            <Nav className="justify-content-center">
              {isAuthenticated && user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as="div" className="user-avatar-toggle">
                    <div className="user-avatar">
                      {user.role === 'ADMIN' && (
                        <Badge bg="info" className="admin-badge">
                          <FontAwesomeIcon icon={faShieldHalved} />
                        </Badge>
                      )}
                      {user.nome ? user.nome.charAt(0).toUpperCase() : '?'}
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.ItemText className="fw-bold">
                      {user.nome}
                    </Dropdown.ItemText>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      as={Link}
                      to={
                        user.role === 'ADMIN'
                          ? '/dashboardAdmin'
                          : '/dashboardUser'
                      }
                    >
                      Meu Painel
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/cadastro"
                    className="btn-principal me-3 px-3 py-2"
                  >
                    Cadastre-se
                  </Button>
                  <Button
                    as={Link}
                    to="/login"
                    className="btn-principal px-3 py-2"
                  >
                    Entrar
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {expanded && (
        <div
          className="navbar-overlay d-lg-none"
          onClick={() => setExpanded(false)}
        ></div>
      )}
    </>
  )
}
