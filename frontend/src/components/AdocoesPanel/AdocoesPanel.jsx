import { useState, useEffect } from 'react'
import { Card, Col, Row, Spinner, Alert, ListGroup, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import './AdocoesPanel.css'

const formatarData = (dataISO) => {
  return new Date(dataISO).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function AdocoesPanel() {
  const [adocoes, setAdocoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const [filters, setFilters] = useState({
    search: '',
    sort: 'desc', 
  })

  useEffect(() => {
    const fetchTodasAdocoes = async () => {
      if (!token) return

      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams(filters)
        const response = await fetch(
          `http://localhost:3000/adocoes?${params.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )

        if (!response.ok) {
          throw new Error('Falha ao buscar adoções. Você tem permissão de admin?')
        }

        const data = await response.json()
        setAdocoes(data)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTodasAdocoes()
  }, [token, filters])

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    const newFilters = {
      search: formData.get('search') || '',
      sort: formData.get('sort') || 'desc',
    }
    setFilters(newFilters)
  }

  const handleClearFilters = (e) => {
    const form = e.target.closest('form')
    if (form) {
      form.reset()
    }
    setFilters({ search: '', sort: 'desc' })
  }

  if (loading) {
    
  }
  if (error) {
    
  }

  return (
    <div className="p-4 adocoes-panel">
      <h2 className="mb-4">Gerenciar Adoções</h2>

      <Form
        onSubmit={handleFilterSubmit}
        className="mb-4 p-3 bg-light rounded shadow-sm"
      >
        <Row className="align-items-end g-3">
          <Col md={6}>
            <Form.Group controlId="searchFiltro">
              <Form.Label className="fw-bold">Buscar por Pet ou Adotante</Form.Label>
              <Form.Control
                type="text"
                name="search"
                placeholder="Digite o nome do pet ou do adotante..."
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="sortFiltro">
              <Form.Label className="fw-bold">Ordenar por Data</Form.Label>
              <Form.Select name="sort" defaultValue="desc">
                <option value="desc">Mais Recentes</option>
                <option value="asc">Mais Antigas</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex">
            <Button type="submit" className="btn-principal w-100 me-2">
              Filtrar
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              className="w-100"
              onClick={handleClearFilters}
            >
              Limpar
            </Button>
          </Col>
        </Row>
      </Form>

      {adocoes.length === 0 && !loading ? (
        <Alert variant="info">
          Nenhum resultado encontrado para os filtros aplicados.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {adocoes.map((adocao) => (
            <Col key={adocao.adocao_id}>
              {/* ... (Seu Card de adoção ... ) ... */}
              <Card className="h-100 shadow-sm adocao-card">
                <Card.Img
                  variant="top"
                  src={
                    adocao.pet.imagem_url1 || 'https://via.placeholder.com/150'
                  }
                />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    Pet: {adocao.pet.nome}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Data: {formatarData(adocao.data_adocao)}
                  </Card.Subtitle>
                </Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Adotante:</strong> {adocao.adotante.nome}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Telefone:</strong> {adocao.adotante.telefone || 'Não informado'}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}