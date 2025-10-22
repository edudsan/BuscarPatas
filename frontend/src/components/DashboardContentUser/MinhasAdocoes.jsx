import { useState, useEffect } from 'react'
import { Card, Col, Row, Spinner, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const formatarData = (dataISO) => {
  if (!dataISO) return 'Data não informada'

  const dataApenas = dataISO.split('T')[0]

  const [ano, mes, dia] = dataApenas.split('-')

  return `${dia}/${mes}/${ano}`
}

export function MinhasAdocoes() {
  const [adocoes, setAdocoes] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchAdocoes = async () => {
      try {
        const response = await fetch('http://localhost:3000/adocoes/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        setAdocoes(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAdocoes()
  }, [token])

  if (loading) return <Spinner animation="border" />

  return (
    <div className="p-4">
      <h2 className="mb-4">Minhas Adoções</h2>
      {adocoes.length === 0 ? (
        <Alert variant="info">Você ainda não realizou nenhuma adoção.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {adocoes.map((adocao) => (
            <Col key={adocao.adocao_id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    adocao.pet.imagem_url1 || 'https://via.placeholder.com/150'
                  }
                />
                <Card.Body>
                  <Card.Title>{adocao.pet.nome}</Card.Title>
                  <Card.Text>
                    Adotado em: {/* <<< USA A NOVA FUNÇÃO DE DATA >>> */}
                    {formatarData(adocao.data_adocao)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
