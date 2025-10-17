import { Row, Col } from 'react-bootstrap'
import { PetCard } from '../PetCard/PetCard'

export function PetList({ pets, loading, onPetClick }) {
  if (loading) {
    return <p>Carregando pets...</p>
  }

  if (pets.length === 0) {
    return <p>Nenhum pet encontrado com os filtros selecionados.</p>
  }

  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {pets.map((pet) => (
        <Col key={pet.pet_id}>
          <PetCard pet={pet} onDetailClick={onPetClick} />
        </Col>
      ))}
    </Row>
  )
}
