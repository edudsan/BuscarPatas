import { Modal, Button, Row, Col, Carousel, Badge } from 'react-bootstrap'

// Função para calcular a idade a partir da data de nascimento
const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return 'Idade não informada'

  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let anos = hoje.getFullYear() - nascimento.getFullYear()
  let meses = hoje.getMonth() - nascimento.getMonth()

  if (meses < 0 || (meses === 0 && hoje.getDate() < nascimento.getDate())) {
    anos--
    meses += 12
  }

  if (anos === 0 && meses === 0) return 'Menos de 1 mês'
  const idadeAnos = anos > 0 ? `${anos} ${anos > 1 ? 'anos' : 'ano'}` : ''
  const idadeMeses = meses > 0 ? `${meses} ${meses > 1 ? 'meses' : 'mês'}` : ''

  return [idadeAnos, idadeMeses].filter(Boolean).join(' e ')
}

export function PetDetailModal({ show, onHide, pet }) {
  if (!pet) return null // Não renderiza nada se não houver pet selecionado

  const idade = calcularIdade(pet.data_nascimento)
  const imagens = [pet.imagem_url1, pet.imagem_url2].filter(Boolean) // Filtra URLs nulas ou vazias

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{pet.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            {imagens.length > 0 ? (
              <Carousel>
                {imagens.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100 rounded"
                      src={url}
                      alt={`Foto ${index + 1} de ${pet.nome}`}
                      style={{ height: '400px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <img
                className="d-block w-100 rounded"
                src="https://via.placeholder.com/400x400?text=Sem+Foto"
                alt="Sem foto"
                style={{ height: '400px', objectFit: 'cover' }}
              />
            )}
          </Col>
          <Col md={6}>
            <h4 className="mt-3 mt-md-0">Detalhes</h4>
            <p>
              <strong>Espécie:</strong> {pet.especie}
            </p>
            <p>
              <strong>Idade Aproximada:</strong> {idade}
            </p>
            <p>
              <strong>Descrição:</strong> {pet.descricao}
            </p>
            <div>
              {pet.tamanho && (
                <Badge bg="primary" className="me-2 p-2">
                  {pet.tamanho}
                </Badge>
              )}
              {pet.personalidade && (
                <Badge bg="success" className="p-2">
                  {pet.personalidade}
                </Badge>
              )}
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" className="btn-principal">
          Quero Adotar!
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
