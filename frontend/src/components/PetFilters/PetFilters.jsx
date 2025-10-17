import { Form, Button, Row, Col } from 'react-bootstrap'

export function PetFilters({ onFilterChange }) {
  const handleFilter = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = {
      tamanho: formData.get('tamanho'),
      personalidade: formData.get('personalidade'),
    }
    onFilterChange(filters)
  }

  return (
    <Form
      onSubmit={handleFilter}
      className="mb-5 p-4 rounded shadow-sm bg-light"
    >
      <Row className="align-items-end g-3">
        <Col md={5}>
          <Form.Group controlId="tamanhoFiltro">
            <Form.Label className="fw-bold">Tamanho</Form.Label>
            <Form.Select name="tamanho">
              <option value="">Todos</option>
              <option value="PEQUENO">Pequeno</option>
              <option value="MEDIO">Médio</option>
              <option value="GRANDE">Grande</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="personalidadeFiltro">
            <Form.Label className="fw-bold">Personalidade</Form.Label>
            <Form.Select name="personalidade">
              <option value="">Todas</option>
              <option value="CALMO">Calmo</option>
              <option value="BRINCALHAO">Brincalhão</option>
              <option value="INDEPENDENTE">Independente</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2} className="d-grid">
          <Button type="submit" className="btn-principal">
            Filtrar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
