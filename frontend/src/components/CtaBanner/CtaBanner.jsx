import '../../styles/global.css'
import './CtaBanner.css'

export function CtaBanner() {
  return (
    <div className="bg-banner py-5 mb-5">
      <div className="container">
        <div className="row justify-content-center align-items-center g-5">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <img
              src="/src/assets/gato-e-cachorro.jpg"
              alt="Cachorro e Gato"
              className="img-fluid rounded img-banner"
            />
          </div>

          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-5 fw-bold">
              O seu novo melhor amigo está te esperando!
            </h1>

            <button className="btn btn-principal btn-lg mt-3">
              Adote agora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
