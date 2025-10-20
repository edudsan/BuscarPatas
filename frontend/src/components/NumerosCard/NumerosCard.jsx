import { Row, Col, Card } from 'react-bootstrap'

export function CardNumero({ titulo, numero, imagem, inverter = false }) {
  const caminhoImagem = imagem

  const imagemOrderClass = inverter ? 'order-md-last' : 'order-md-first'
  const conteudoOrderClass = inverter ? 'order-md-first' : 'order-md-last'

  return (
    <Card className="shadow-sm h-100 my-4">
      <Row className="g-0 align-items-center">
        <Col xs={12} md={6} className={conteudoOrderClass}>
          <Card.Body className="d-flex flex-column justify-content-center p-3 p-md-4 text-center text-md-start">
            <Card.Title className="fs-5 mb-1 text-secondary">
              {titulo}
            </Card.Title>
            <Card.Text className="display-4 fw-bold text-primary">
              {numero}
            </Card.Text>
          </Card.Body>
        </Col>

        <Col xs={12} md={6} className={imagemOrderClass}>
          <Card.Img
            src={caminhoImagem}
            alt={titulo}
            className="img-fluid card-numero-img"
            // style={{ maxHeight: '350px' }}
          />
        </Col>
      </Row>
    </Card>
  )
}
