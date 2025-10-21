import { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { CtaBanner } from '../components/CtaBanner/CtaBanner'
import { FAQSection } from '../components/FaqSection/FaqSection'
import { PetFilters } from '../components/PetFilters/PetFilters'
import { PetList } from '../components/PetList/PetList'
import { Footer } from '../components/Footer/Footer'
import { PaginationControls } from '../components/PaginationControls/PaginationControls'
import { PetDetailModal } from '../components/PetDetailModal/PetDetailModal'

export function Home() {
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
      const url = `http://localhost:3000/pets?${queryParams}`

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

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters, page: 1 }))
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
    setFilters((currentFilters) => ({ ...currentFilters }))
  }

  return (
    <main>
      <CtaBanner
        imageUrl="/src/assets/gato-e-cachorro.jpg"
        imageAlt="Cachorro e Gato"
        title="O seu novo melhor amigo está te esperando!"
        buttonText="Adote agora"
      />

      <Container
        as="section"
        id="busca"
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

      <CtaBanner
        imageUrl="/src/assets/mao-humana-segurando-pata.jpg"
        imageAlt="Mão segurando patinha"
        title="O buscar Patas já ajudou 1000 pets a encontrarem um lar"
        buttonText="Saiba mais sobre nós"
        buttonHref="/sobre"
        reversed={true}
      />
      <FAQSection />
      <Footer />

      {selectedPet && (
        <PetDetailModal
          show={showModal}
          onHide={handleCloseModal}
          pet={selectedPet}
          onAdocaoConcluida={handleAdocaoConcluida}
        />
      )}
    </main>
  )
}
