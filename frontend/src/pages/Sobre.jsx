import '../styles/global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faPaw,
  faShieldAlt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

export function Sobre() {
  const mvvItems = [
    {
      icon: faHeart,
      title: 'Missão',
      text: 'Conectar pets abandonados e lares amorosos por meio de uma plataforma simples e segura, promovendo o bem-estar animal e a adoção responsável.',
      colorVar: 'var(--cor-azul)',
    },
    {
      icon: faShieldAlt,
      title: 'Visão',
      text: 'Ser a plataforma líder em adoção responsável no país, transformando a realidade de milhares de animais e inspirando uma cultura de cuidado e respeito.',
      colorVar: 'var(--cor-verde)',
    },
    {
      icon: faUsers,
      title: 'Valores',
      text: 'Transparência em todo o processo, Responsabilidade social, Compaixão e Dedicação à causa animal. Estes pilares guiam cada decisão que tomamos.',
      colorVar: 'var(--cor-laranja)',
    },
  ]

  return (
    <main className="container my-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold" style={{ color: 'var(--cor-azul)' }}>
          <FontAwesomeIcon icon={faPaw} className="me-3" />
          Sobre a Buscar Patas
        </h1>
        <p className="lead text-secondary mt-3">
          Nossa história, nossa paixão e o compromisso com a vida animal.
        </p>
      </header>

      <section className="row justify-content-center mb-5 pb-4 border-bottom">
        <div className="col-lg-8">
          <h2 className="fw-bold mb-3">Nossa História</h2>
          <p>
            A <span className="fw-bold">Buscar Patas</span> nasceu em 2023 da
            união de um grupo de voluntários dedicados à causa animal,
            frustrados com a dificuldade de conectar animais resgatados a
            famílias que realmente pudessem cuidar deles. Percebemos que faltava
            uma ponte digital eficiente e, assim, criamos uma plataforma que
            agiliza o processo de adoção, tornando-o transparente e seguro para
            todos.
          </p>
          <p>
            Desde então, já ajudamos centenas de pets a encontrarem seu lar
            definitivo. Acreditamos que cada vida importa e que o amor pode
            mudar o destino de um animal.
          </p>
        </div>
      </section>

      <section className="mvv-section my-5">
        <h2
          className="text-center fw-bold mb-5"
          style={{ color: 'var(--cor-azul)' }}
        >
          Nossos Pilares
        </h2>

        <div className="row g-4">
          {mvvItems.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 text-center shadow-sm border-0 pt-4">
                <div className="card-body d-flex flex-column align-items-center">
                  <FontAwesomeIcon
                    icon={item.icon}
                    size="3x"
                    className="mb-3"
                    style={{ color: item.colorVar }}
                  />

                  <h4 className="card-title fw-bold">{item.title}</h4>
                  <p className="card-text text-secondary">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-5 pt-4">
        <h3 className="mb-4">Junte-se a nós nessa missão!</h3>
        <button
          className="btn btn-principal fw-bold"
          style={{
            backgroundColor: 'var(--cor-laranja)',
            borderColor: 'var(--cor-laranja)',
            color: 'white',
          }}
        >
          Ver Pets para Adoção
        </button>
      </section>
    </main>
  )
}
