import { Card, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import './UserCard.css'

export function UserCard({ user, onRoleChange, onDelete, onEdit }) {
  // Adicionado onEdit
  const avatarUrl = `https://i.pravatar.cc/150?u=${user.email}`

  return (
    <Card className="user-card shadow-sm h-100">
      <Card.Body>
        <div className="user-info-container">
          <img src={avatarUrl} alt={user.nome} className="user-avatar" />
          <div className="user-details">
            <h5 className="user-name mb-0">{user.nome}</h5>
            <p className="user-email text-muted mb-0">{user.email}</p>
            <p className="user-phone text-muted">{user.telefone}</p>
          </div>
        </div>

        <div className="user-actions-container">
          <Form.Check
            type="switch"
            id={`admin-switch-${user.adotante_id}`}
            label="Admin"
            checked={user.role === 'ADMIN'}
            onChange={() =>
              onRoleChange(
                user.adotante_id,
                user.role === 'ADMIN' ? 'USER' : 'ADMIN',
              )
            }
            className="admin-switch"
          />
          <div className="user-buttons">
            <Button
              variant="link"
              className="action-btn"
              onClick={() => onEdit(user)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              variant="link"
              className="action-btn text-danger"
              onClick={() => onDelete(user.adotante_id, user.nome)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
