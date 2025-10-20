import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })

  const [apiError, setApiError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('') // Estado para o erro do email

  const navigate = useNavigate()

  // Função `handleChange` para validar email
  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'email') {
      // Verifica se o e-mail tem "@" quando não está vazio
      if (value && !value.includes('@')) {
        setEmailError('Digite um e-mail válido (ex: email@example.com)')
      } else {
        setEmailError('') // Limpa o erro se o formato for válido ou o campo estiver vazio
      }
    }

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setApiError(null)

    // Validação final para garantir que não será enviado com erro visível
    if (emailError) {
      return
    }

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'E-mail ou senha inválidos.')
      }

      const data = await response.json()
      alert('Login realizado com sucesso!')
      navigate('/dashboardAdmin')
    } catch (err) {
      setApiError(err.message)
    }
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <h2 className="text-center mb-4">Acessar sua Conta</h2>
          <Form noValidate onSubmit={handleSubmit}>
            {apiError && <Alert variant="danger">{apiError}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seuemail@example.com"
                required
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <div className="d-grid mt-4">
              {/* Botão é desabilitado se houver erro no e-mail */}
              <Button
                type="submit"
                className="btn-principal"
                disabled={!!emailError}
              >
                Entrar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
