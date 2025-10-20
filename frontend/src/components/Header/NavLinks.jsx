import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link'

export function NavLinks({ onNavLinkClick }) {
  return (
    <>
      <Nav.Link
        as={Link}
        to="/"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          onNavLinkClick()
        }}
        className="nav-custom-link"
      >
        Home
      </Nav.Link>

      <Nav.Link
        as={Link}
        to="/sobre"
        className="nav-custom-link"
        onClick={onNavLinkClick}
      >
        Sobre
      </Nav.Link>

      <Nav.Link
        as={NavHashLink}
        to="/#busca"
        className="nav-custom-link"
        onClick={onNavLinkClick}
      >
        Buscar
      </Nav.Link>

      <Nav.Link
        as={NavHashLink}
        to="/#faq"
        className="nav-custom-link"
        onClick={onNavLinkClick}
      >
        FAQ
      </Nav.Link>
    </>
  )
}
