import { useState } from 'react'
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  ListGroup,
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useAuth } from '../../contexts/AuthContext'
import { capitalizeFirstLetter } from '../../utils/formatters'

// DEFINIÇÃO DA URL DA API (Usando import.meta.env para Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function PetEditPanel({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [petToEdit, setPetToEdit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const { token } = useAuth()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    setLoading(true)
    setSearchResults([])
    setPetToEdit(null)
    try {
      // CORREÇÃO 1: Usando API_URL para buscar pets
      const response = await fetch(
        `${API_URL}/pets?nome=${searchTerm.toLowerCase()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const data = await response.json()
      setSearchResults(data.data)
    } catch (error) {
      Swal.fire('Erro!', 'Não foi possível buscar os pets.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const selectPetToEdit = (pet) => {
    setPetToEdit(pet)
    setFormData({
      nome: pet.nome || '',
      especie: pet.especie || '',
      descricao: pet.descricao || '',
      // Verifica se a data existe antes de tentar formatá-la
      data_nascimento: pet.data_nascimento
        ? pet.data_nascimento.split('T')[0]
        : '',
      tamanho: pet.tamanho || 'PEQUENO',
      personalidade: pet.personalidade || 'CALMO',
    })
    setSearchResults([])
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // CORREÇÃO 2: Usando API_URL para a rota PATCH
      const response = await fetch(`${API_URL}/pets/${petToEdit.pet_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Falha ao atualizar o pet.')
      }
      Swal.fire('Sucesso!', 'Pet atualizado com sucesso!', 'success')
      setPetToEdit(null) // Limpa o formulário e volta para a tela de busca
      setSearchTerm('') // Limpa o campo de busca
    } catch (error) {
      Swal.fire('Erro!', error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Container className="p-4">
      <div className="form-card">
        <Button variant="secondary" onClick={onBack} className="mb-4">
          Voltar
        </Button>

        {!petToEdit ? (
          <>
            <h2 className="mb-4">Editar Pet</h2>
            <Form onSubmit={handleSearch}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Buscar pet pelo nome</Form.Label>
                    <Form.Control
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Digite o nome do pet..."
                    />
                  </Form.Group>
                </Col>
                <Col xs="auto" className="d-flex align-items-end">
                  <Button
                    type="submit"
                    className="btn-principal"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" /> : 'Buscar'}
                  </Button>
                </Col>
              </Row>
            </Form>
            {searchResults.length > 0 && (
              <ListGroup className="mt-4">
                {searchResults.map((pet) => (
                  <ListGroup.Item
                    action
                    key={pet.pet_id}
                    onClick={() => selectPetToEdit(pet)}
                  >
                    {capitalizeFirstLetter(pet.nome)} (
                    {capitalizeFirstLetter(pet.especie)})
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </>
        ) : (
          <>
            <h2 className="mb-4">
              Editando: {capitalizeFirstLetter(petToEdit.nome)}
            </h2>
            <Form onSubmit={handleUpdate}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Espécie</Form.Label>
                    <Form.Control
                      type="text"
                      name="especie"
                      value={formData.especie}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control
                      type="date"
                      name="data_nascimento"
                      value={formData.data_nascimento}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tamanho</Form.Label>
                    <Form.Select
                      name="tamanho"
                      value={formData.tamanho}
                      onChange={handleFormChange}
                    >
                      <option value="PEQUENO">Pequeno</option>
                      <option value="MEDIO">Médio</option>
                      <option value="GRANDE">Grande</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Personalidade</Form.Label>
                    <Form.Select
                      name="personalidade"
                      value={formData.personalidade}
                      onChange={handleFormChange}
                    >
                      <option value="CALMO">Calmo</option>
                      <option value="BRINCALHAO">Brincalhão</option>
                      <option value="INDEPENDENTE">Independente</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                type="submit"
                className="btn-principal"
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : 'Salvar Alterações'}
              </Button>
            </Form>
          </>
        )}
      </div>
    </Container>
  )
}
