import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    // Se não estiver logado, redireciona para a página de login
    return <Navigate to="/login" replace />
  }

  if (adminOnly && user.role !== 'ADMIN') {
    // Se a rota for só para admin e o usuário não for, redireciona para a home
    return <Navigate to="/" replace />
  }

  return children
}
