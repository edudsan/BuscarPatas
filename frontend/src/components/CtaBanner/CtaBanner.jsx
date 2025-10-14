import '../../styles/global.css'
import './CtaBanner.css'
import { HashLink } from 'react-router-hash-link'

export function CtaBanner({
  imageUrl,
  imageAlt,
  title,
  buttonText,
  buttonHref = '#busca',
  reversed,
}) {
  const rowClasses = `row justify-content-center align-items-center g-5 ${
    reversed ? 'flex-md-row-reverse' : ''
  }`
  return (
    <div className="bg-banner py-5 mb-5">
      <div className="container">
        <div className={rowClasses}>
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="img-fluid rounded img-banner"
            />
          </div>

          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-5 fw-bold">{title}</h1>

            <HashLink className="btn btn-principal btn-lg mt-3" to={buttonHref}>
              {buttonText}
            </HashLink>
          </div>
        </div>
      </div>
    </div>
  )
}
