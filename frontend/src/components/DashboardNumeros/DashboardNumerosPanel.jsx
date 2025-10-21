import React, { useState, useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { CardNumero } from '../NumerosCard/NumerosCard'
import { useAuth } from '../../contexts/AuthContext'

const IMAGE_ADOTANTES =
  'https://images.unsplash.com/photo-1610573501131-a9766c02001a?auto=format&fit=crop&q=80&w=870'
const IMAGE_TOTAL_PETS =
  'https://images.unsplash.com/photo-1469569946320-b4f13e4b7d5e?auto=format&fit=crop&q=80&w=870'
const IMAGE_PETS_ADOTADOS =
  'https://plus.unsplash.com/premium_photo-1731629278699-a0c9610babe2?auto=format&fit=crop&q=80&w=870'
const IMAGE_PETS_AGUARDANDO =
  'https://images.unsplash.com/photo-1627916943542-f8526543886f?q=80&w=870&auto=format&fit=crop'

export function DashboardNumerosPanel() {
  const { token, user, loading: authLoading } = useAuth()

  const [counts, setCounts] = useState({
    totalAdotantes: '...',
    totalPets: '...',
    petsAdotados: '...',
    petsAguardando: '...',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (authLoading) return // Espera o contexto de autenticação carregar

    const fetchCounts = async () => {
      // Verifica se o usuário é ADMIN e está autenticado
      if (!token || user?.role !== 'ADMIN') {
        setLoading(false)
        setError('Acesso negado. Área restrita a administradores.')
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetch('http://localhost:3000/dashboard/counts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(
            errorData.error ||
              'Não foi possível carregar os números do dashboard.',
          )
        }

        const data = await response.json()

        const petsAguardando = (data.totalPets || 0) - (data.petsAdotados || 0)

        setCounts({
          totalAdotantes: data.totalAdotantes || 0,
          totalPets: data.totalPets || 0,
          petsAdotados: data.petsAdotados || 0,
          petsAguardando: petsAguardando,
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCounts()
  }, [token, user, authLoading])

  if (loading || authLoading) {
    return (
      <div className="container p-5 text-center">
        <h2 className="display-6 fs-2 fw-semibold">Nossos Números</h2>
        <Spinner animation="border" role="status" className="mt-4">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container p-4">
        <h2 className="display-6 fs-2 fw-semibold">Nossos Números</h2>
        <Alert variant="danger" className="mt-4">
          Erro ao carregar dados: {error}
        </Alert>
      </div>
    )
  }

  return (
    <div className="container p-4">
      <h2 className="display-6 fs-2 text-center fw-semibold mb-4">
        Nossos Números
      </h2>

      <CardNumero
        titulo="Total de adotantes cadastrados:"
        numero={counts.totalAdotantes}
        imagem={IMAGE_ADOTANTES}
        inverter={true}
      />

      <CardNumero
        titulo="Total de pets cadastrados:"
        numero={counts.totalPets}
        imagem={IMAGE_TOTAL_PETS}
        inverter={false}
      />

      <CardNumero
        titulo="Total de pets adotados:"
        numero={counts.petsAdotados}
        imagem={IMAGE_PETS_ADOTADOS}
        inverter={true}
      />

      <CardNumero
        titulo="Total de pets aguardando adoção:"
        numero={counts.petsAguardando}
        imagem={IMAGE_PETS_AGUARDANDO}
        inverter={false}
      />
    </div>
  )
}
