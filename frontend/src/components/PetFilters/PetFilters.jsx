import { Form, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

// DEFINIÇÃO DA URL DA API (Usando import.meta.env para Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function PetFilters({ onFilterChange }) {
  const [especies, setEspecies] = useState([])

  useEffect(() => {
    async function fetchEspecies() {
      try {
        // CORREÇÃO: Usando API_URL para carregar as espécies
        const response = await fetch(`${API_URL}/pets/especies`)
        if (!response.ok) {
          throw new Error('Falha ao carregar espécies')
        }
        const data = await response.json()
        setEspecies(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEspecies()
  }, [])

  const handleFilter = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const filters = {}
    const tamanho = formData.get('tamanho')
    const personalidade = formData.get('personalidade')
    const especie = formData.get('especie')
    const nome = formData.get('nome')

    if (tamanho) filters.tamanho = tamanho
    if (personalidade) filters.personalidade = personalidade
    if (especie) filters.especie = especie
    if (nome) filters.nome = nome

    onFilterChange(filters)
  }

  return (
    <Form
      onSubmit={handleFilter}
      className="mb-5 p-4 rounded shadow-sm bg-light"
    >
      <Row className="align-items-end g-3">
        {/* Campo de Nome */}
        <Col md={3}>
          <Form.Group controlId="nomeFiltro">
            <Form.Label className="fw-bold">Nome do Pet</Form.Label>
            <Form.Control type="text" name="nome" placeholder="Ex: Bob" />
          </Form.Group>
        </Col>

        {/* Filtro de Espécie */}
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

        {/* Filtro de Tamanho */}
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

        {/* Filtro de Personalidade */}
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
      </Row>

      <Row className="mt-4">
        <Col className="d-flex justify-content-end">
          <Button
            type="button"
            variant="outline-secondary"
            className="me-2"
            onClick={(e) => {
              const form = e.target.closest('form')
              if (form) {
                form.reset()
              }
              onFilterChange({})
            }}
          >
            Limpar Filtros
          </Button>
          <Button type="submit" className="btn-principal">
            Filtrar
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
