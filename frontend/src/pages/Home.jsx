import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { CtaBanner } from '../components/CtaBanner/CtaBanner'
import { FAQSection } from '../components/FaqSection/FaqSection'
import { PetFilters } from '../components/PetFilters/PetFilters'
import { PetList } from '../components/PetList/PetList'
import { Footer } from '../components/Footer/Footer'
import { PaginationControls } from '../components/PaginationControls/PaginationControls';
import { PetDetailModal } from '../components/PetDetailModal/PetDetailModal';


export function Home() {
  const [pets, setPets] = useState([])
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  })
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    async function fetchPets() {
      setLoading(true)

      // String de query com os filtros ativos
      const queryParams = new URLSearchParams(filters).toString()
      const url = `http://localhost:3000/pets?${queryParams}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        setPets(data.data)
        setPagination(data.pagination);
      } catch (error) {
        console.error('Falha ao buscar pets:', error)
        // Em caso de erro, define a lista de pets como vazia
        setPets([])
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [filters])

    // Função que será chamada pelo componente PetFilters quando o usuário aplicar um filtro
    const handleFilterChange = (newFilters) => {
      setFilters({ ...filters, ...newFilters, page: 1 });
    };
    const handlePageChange = (newPage) => {
      setFilters({ ...filters, page: newPage });
    };

    const handleLimitChange = (newLimit) => {
      setFilters({ ...filters, limit: newLimit, page: 1 }); 
    };

    const handleShowModal = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPet(null);
  };

  return (
    <main>
      <CtaBanner
        imageUrl="/src/assets/gato-e-cachorro.jpg"
        imageAlt="Cachorro e Gato"
        title="O seu novo melhor amigo está te esperando!"
        buttonText="Adote agora"
      />

      <Container as="section" id="busca" className="py-5 my-4">
        <h2 className="text-center mb-4 display-5 fw-light">
          Encontre seu novo amigo
        </h2>

        <PetFilters onFilterChange={handleFilterChange} />

        <PetList pets={pets} loading={loading} onPetClick={handleShowModal} />
        <PaginationControls 
          pagination={pagination}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}/>
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
      <PetDetailModal 
          show={showModal} 
          onHide={handleCloseModal} 
          pet={selectedPet} 
        />
      <Footer />
    </main>
  )
}
