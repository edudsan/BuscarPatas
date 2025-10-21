import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function PetFilters({ onFilterChange }) {
  const [especies, setEspecies] = useState([]);

  useEffect(() => {
    async function fetchEspecies() {
      try {
        const response = await fetch('http://localhost:3000/pets/especies'); 
        if (!response.ok) {
          throw new Error('Falha ao carregar espécies');
        }
        const data = await response.json();
        setEspecies(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEspecies();
  }, []);


  const handleFilter = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    
    const filters = {}
    const tamanho = formData.get('tamanho')
    const personalidade = formData.get('personalidade')
    const especie = formData.get('especie')

    if (tamanho) filters.tamanho = tamanho
    if (personalidade) filters.personalidade = personalidade
    if (especie) filters.especie = especie

    onFilterChange(filters)
  }

  return (
    <Form
      onSubmit={handleFilter}
      className="mb-5 p-4 rounded shadow-sm bg-light"
    >
      <Row className="align-items-end g-3">
        <Col md={3}>
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

        <Col md={3}>
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
        
        <Col md={3}>
          <Form.Group controlId="especieFiltro">
            <Form.Label className="fw-bold">Espécie</Form.Label>
            <Form.Select name="especie">
              <option value="">Todas</option>
              {especies.map((esp) => (
                <option key={esp} value={esp}>
                  {capitalize(esp)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3} className="d-grid">
          <Button type="submit" className="btn-principal">
            Filtrar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}