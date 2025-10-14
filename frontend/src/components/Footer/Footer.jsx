import './Footer.css'
import { HashLink } from 'react-router-hash-link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faInstagram,
  faFacebookF,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'

export function Footer() {
  return (
    <footer className="footer-custom mt-auto py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-4 text-center text-lg-start mb-4 mb-lg-0">
            <HashLink to="/#top" smooth>
              <img
                src="../../../src/assets/logo.png"
                alt="Buscar Patas Logo"
                className="img-fluid footer-logo"
              />
            </HashLink>
          </div>

          <div className="col-12 col-lg-8">
            <div className="row  px-4">
              <div className="col-6 col-lg-6 mb-4 mb-lg-0  text-md-start">
                <ul className="list-unstyled footer-links">
                  <li>
                    <HashLink to="/#top" smooth>
                      Home
                    </HashLink>
                  </li>
                  <li>
                    <HashLink to="/cadastro">Cadastre-se</HashLink>
                  </li>
                  <li>
                    <HashLink to="/#busca" smooth>
                      Adote agora
                    </HashLink>
                  </li>
                  <li>
                    <HashLink to="/#faq" smooth>
                      Dúvidas
                    </HashLink>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-lg-6 text-center text-md-start">
                <h6 className="footer-heading text-large-desktop">
                  Nossas redes sociais
                </h6>
                <div className="d-flex justify-content-center justify-content-md-start gap-3 footer-socials">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>

                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
