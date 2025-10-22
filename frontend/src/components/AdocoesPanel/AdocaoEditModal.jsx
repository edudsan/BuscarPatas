import { useState, useEffect } from 'react'
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import Swal from 'sweetalert2'

export function AdocaoEditModal({ show, onHide, adocao, onUpdateSuccess }) {
  const [petsDisponiveis, setPetsDisponiveis] = useState([])
  const [novoPetId, setNovoPetId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  // Busca os pets disponíveis quando o modal é aberto
  useEffect(() => {
    if (show) {
      const fetchPetsDisponiveis = async () => {
        setLoading(true)
        setError(null)
        try {
          // 1. Busca pets disponíveis (rota do seu petController)
          const response = await fetch('http://localhost:3000/pets/disponiveis', {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (!response.ok) throw new Error('Falha ao buscar pets disponíveis.')
          
          const data = await response.json()
          setPetsDisponiveis(data)
          // 2. Define o pet atual como o selecionado por padrão
          setNovoPetId(adocao.pet_id) 
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
      fetchPetsDisponiveis()
    }
  }, [show, adocao, token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!novoPetId || novoPetId === adocao.pet_id) {
      // Se não mudou, apenas fecha o modal
      onHide()
      return
    }

    try {
      // Chama a rota PATCH do seu adocaoController
      const response = await fetch(`http://localhost:3000/adocoes/${adocao.adocao_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pet_id: parseInt(novoPetId) }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Falha ao atualizar adoção.')
      }

      Swal.fire('Sucesso!', 'A adoção foi atualizada.', 'success')
      onUpdateSuccess() // Chama a função do pai para atualizar a lista
    } catch (err) {
      Swal.fire('Erro!', err.message, 'error')
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Pet da Adoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>
            <strong>Adotante:</strong> {adocao?.adotante.nome}
          </p>
          <hr />
          <Form.Group controlId="petSelect">
            <Form.Label>Selecione o novo pet:</Form.Label>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <Form.Select
                value={novoPetId}
                onChange={(e) => setNovoPetId(e.target.value)}
              >
                {/* 1. Opção para o pet que JÁ está na adoção */}
                <option value={adocao?.pet_id}>
                  Atual: {adocao?.pet.nome} ({adocao?.pet.especie})
                </option>
                <option disabled>--- PETS DISPONÍVEIS ---</option>
                
                {/* 2. Lista de outros pets disponíveis */}
                {petsDisponiveis
                  .filter(pet => pet.pet_id !== adocao?.pet_id) // Não repete o pet atual
                  .map(pet => (
                    <option key={pet.pet_id} value={pet.pet_id}>
                      {pet.nome} ({pet.especie})
                    </option>
                  ))
                }
              </Form.Select>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" className="btn-principal" disabled={loading}>
            Salvar Alteração
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}