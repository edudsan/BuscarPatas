import { Card, Button, Badge } from 'react-bootstrap'
import './PetCard.css'
import { capitalizeFirstLetter } from '../../utils/formatters'

export function PetCard({ pet, onDetailClick }) {
  const imageUrl =
    pet.imagem_url1 || 'https://via.placeholder.com/300x200?text=Sem+Foto'

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imageUrl} className="pet-card-img" />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">
          {capitalizeFirstLetter(pet.nome)}
        </Card.Title>
        <Card.Text className="text-secondary flex-grow-1">
          {pet.descricao}
        </Card.Text>
        <div className="mb-3">
          {pet.tamanho && (
            <Badge bg="primary" className="me-2">
              {pet.tamanho}
            </Badge>
          )}
          {pet.personalidade && <Badge bg="success">{pet.personalidade}</Badge>}
        </div>

        <Button
          variant="primary"
          className="btn-principal mt-auto"
          onClick={() => onDetailClick(pet)}
        >
          Ver Detalhes
        </Button>
      </Card.Body>
    </Card>
  )
}
