import { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { PetFilters } from '../PetFilters/PetFilters'
import { PetList } from '../PetList/PetList'
import { PaginationControls } from '../PaginationControls/PaginationControls'
import { PetDetailModal } from '../PetDetailModal/PetDetailModal'

// DEFINIÇÃO DA URL DA API (Usando import.meta.env para Vite)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function BuscarPets() {
  const [pets, setPets] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  })
  const [showModal, setShowModal] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const buscaSectionRef = useRef(null)

  useEffect(() => {
    async function fetchPets() {
      setLoading(true)

      const allFilters = { ...filters, status: 'DISPONIVEL' }
      const queryParams = new URLSearchParams(allFilters).toString()
      // CORREÇÃO: Usando API_URL para a busca de pets
      const url = `${API_URL}/pets?${queryParams}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        setPets(data.data)
        setPagination(data.pagination)
      } catch (error) {
        console.error('Falha ao buscar pets:', error)
        setPets([])
      } finally {
        setLoading(false)
      }
    }
    fetchPets()
  }, [filters])

  // Função para limpar os filtros antigos
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      const baseFilters = {
        limit: prevFilters.limit,
        page: 1,
      }
      return { ...baseFilters, ...newFilters }
    })
  }

  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({ ...prevFilters, page: newPage }))
    buscaSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleLimitChange = (newLimit) => {
    setFilters((prevFilters) => ({ ...prevFilters, limit: newLimit, page: 1 }))
    buscaSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleShowModal = (pet) => {
    setSelectedPet(pet)
    setShowModal(true)
  }
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPet(null)
  }
  const handleAdocaoConcluida = () => {
    handleCloseModal()
    // Força a atualização da lista (mantendo os filtros atuais)
    setFilters((currentFilters) => ({ ...currentFilters }))
  }

  return (
    <>
      <Container
        as="section"
        id="busca-pets-dashboard"
        className="py-5 my-4"
        ref={buscaSectionRef}
      >
        <h2 className="text-center mb-4 display-5 fw-light">
          Encontre seu novo amigo
        </h2>
        <PaginationControls
          pagination={pagination}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
        <PetFilters onFilterChange={handleFilterChange} />
        <PetList pets={pets} loading={loading} onPetClick={handleShowModal} />
        <PaginationControls
          pagination={pagination}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </Container>

      {selectedPet && (
        <PetDetailModal
          show={showModal}
          onHide={handleCloseModal}
          pet={selectedPet}
          onAdocaoConcluida={handleAdocaoConcluida}
        />
      )}
    </>
  )
}
