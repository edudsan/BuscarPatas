import { Pagination, Form } from 'react-bootstrap';

export function PaginationControls({ pagination, onPageChange, onLimitChange }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null; 
  }

  const { page, totalPages, limit } = pagination;

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <div className="d-flex align-items-center">
        <span className="me-2 text-muted">Itens por página:</span>
        <Form.Select 
          size="sm" 
          value={limit} 
          onChange={(e) => onLimitChange(Number(e.target.value))}
          style={{ width: '80px' }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </Form.Select>
      </div>

      <Pagination>
        <Pagination.Prev 
          disabled={page === 1} 
          onClick={() => onPageChange(page - 1)} 
        />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next 
          disabled={page === totalPages} 
          onClick={() => onPageChange(page + 1)} 
        />
      </Pagination>
    </div>
  );
}