import { useState } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useAuth } from '../../contexts/AuthContext'

export function PetCreatePanel({ onBack }) {
  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    data_nascimento: '',
    descricao: '',
    tamanho: 'PEQUENO',
    personalidade: 'CALMO',
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imageFile) {
      Swal.fire(
        'Atenção!',
        'Por favor, selecione uma imagem para o pet.',
        'warning',
      )
      return
    }
    setLoading(true)

    const data = new FormData()
    data.append('nome', formData.nome)
    data.append('especie', formData.especie)
    data.append('data_nascimento', formData.data_nascimento)
    data.append('descricao', formData.descricao)
    data.append('tamanho', formData.tamanho)
    data.append('personalidade', formData.personalidade)
    data.append('image', imageFile)

    try {
      const response = await fetch('http://localhost:3000/pets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Falha ao cadastrar o pet.')
      }

      Swal.fire('Sucesso!', 'Novo pet cadastrado com sucesso!', 'success')
      e.target.reset() // Limpa o formulário
      setFormData({
        // Reseta o estado do formulário
        nome: '',
        especie: '',
        data_nascimento: '',
        descricao: '',
        tamanho: 'PEQUENO',
        personalidade: 'CALMO',
      })
      setImageFile(null)
    } catch (error) {
      Swal.fire('Erro!', error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="p-4">
      <div className="form-card">
        <Button variant="secondary" onClick={onBack} className="mb-4">
          Voltar
        </Button>
        <h2 className="mb-4">Cadastrar Novo Pet</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Pet</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Espécie</Form.Label>
                <Form.Control
                  type="text"
                  name="especie"
                  onChange={handleChange}
                  required
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
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Data de Nascimento (Aprox.)</Form.Label>
                <Form.Control
                  type="date"
                  name="data_nascimento"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tamanho</Form.Label>
                <Form.Select
                  name="tamanho"
                  value={formData.tamanho}
                  onChange={handleChange}
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
                  onChange={handleChange}
                >
                  <option value="CALMO">Calmo</option>
                  <option value="BRINCALHAO">Brincalhão</option>
                  <option value="INDEPENDENTE">Independente</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Imagem Principal</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Button type="submit" className="btn-principal" disabled={loading}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              'Cadastrar Pet'
            )}
          </Button>
        </Form>
      </div>
    </Container>
  )
}
