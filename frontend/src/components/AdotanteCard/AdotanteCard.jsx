import { Card, Form, Button, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import './AdotanteCard.css';
import { capitalizeFirstLetter } from '../../utils/formatters';

export function AdotanteCard({ user, onRoleChange, onDelete, onEdit }) {
  const avatarUrl = `https://i.pravatar.cc/150?u=${user.email}`;

  const formatPhoneNumber = (phone) => {
    if (!phone) return 'Telefone não informado';
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <Card className="adotante-card shadow-sm h-100">
      <Card.Body>
        <Stack gap={2} className="text-center align-items-center mb-3">
          <img src={avatarUrl} alt={user.nome} className="user-avatar-card" />
          <div className="user-details-card">
            <h5 className="user-name-card mb-0">
              {capitalizeFirstLetter(user.nome)}
            </h5>
            <p className="user-email-card text-muted mb-0">{user.email}</p>
            <p className="user-phone-card text-muted">
              {formatPhoneNumber(user.telefone)}
            </p>
          </div>
        </Stack>
        
        <div className="user-actions-card">
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
            className="admin-switch-card"
          />
          <div className="action-buttons-group">
            <Button
              variant="link"
              className="action-btn-card"
              onClick={() => onEdit(user)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              variant="link"
              className="action-btn-card text-danger"
              onClick={() => onDelete(user.adotante_id, user.nome)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div> 
      </Card.Body>
    </Card>
  );
}