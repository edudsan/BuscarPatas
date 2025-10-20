import { Pagination, Form } from 'react-bootstrap'

// Função para gerar os números de página a serem exibidos
const generatePageNumbers = (currentPage, totalPages) => {
  const pages = []
  const maxPagesToShow = 3 // Máximo de botões de página visíveis
  const half = Math.floor(maxPagesToShow / 2)

  if (totalPages <= maxPagesToShow + 2) {
    // Mostra todas as páginas se o total for pequeno
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else if (currentPage <= half + 1) {
    for (let i = 1; i <= maxPagesToShow; i++) {
      pages.push(i)
    }
    pages.push('...')
    pages.push(totalPages)
  } else if (currentPage >= totalPages - half) {
    pages.push(1)
    pages.push('...')
    for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    pages.push('...')
    for (let i = currentPage - half + 1; i <= currentPage + half - 1; i++) {
      pages.push(i)
    }
    pages.push('...')
    pages.push(totalPages)
  }
  return pages
}

export function PaginationControls({
  pagination,
  onPageChange,
  onLimitChange,
}) {
  if (!pagination || pagination.totalPages <= 0) {
    return null // Não renderiza nada se não houver páginas
  }

  const { page, totalPages, limit } = pagination
  const pageNumbers = generatePageNumbers(page, totalPages)

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
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
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        />

        {pageNumbers.map((p, index) =>
          p === '...' ? (
            <Pagination.Ellipsis key={`ellipsis-${index}`} disabled />
          ) : (
            <Pagination.Item
              key={p}
              active={p === page}
              onClick={() => onPageChange(p)}
            >
              {p}
            </Pagination.Item>
          ),
        )}

        <Pagination.Next
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        />
        <Pagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
        />
      </Pagination>
    </div>
  )
}
