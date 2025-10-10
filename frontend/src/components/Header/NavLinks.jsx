import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link'

export function NavLinks() {
  return (
    <>
      <Nav.Link
        as={Link}
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="nav-custom-link fs-4"
      >
        Home
      </Nav.Link>

      <Nav.Link as={Link} to="/sobre" className="nav-custom-link fs-4">
        Sobre
      </Nav.Link>

      <Nav.Link as={NavHashLink} to="/#busca" className="nav-custom-link fs-4">
        Buscar
      </Nav.Link>

      <Nav.Link as={NavHashLink} to="/#faq" className="nav-custom-link fs-4">
        FAQ
      </Nav.Link>
    </>
  )
}
