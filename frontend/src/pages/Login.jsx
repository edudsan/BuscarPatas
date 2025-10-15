import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


export function Login() {

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  // Estados para feedback da API e para mostrar/ocultar senha
  const [apiError, setApiError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Função genérica para lidar com mudanças nos inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função de submissão para o endpoint de login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError(null); 

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        throw new Error(errorData.error || 'E-mail ou senha inválidos.');
      }

      // Salvar o token de autenticação, ainda está em teste
      const { token } = await response.json();
      localStorage.setItem('authToken', token);
      
      Swal.fire({
        title: 'Login Bem-Sucedido!',
        text: 'Você será redirecionado para a página inicial.',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: 'OK',
      }).then(() => {
        // Redireciona para a home quando o alerta fechar pelo timer ou pelo botão
        navigate('/');
      });
    } catch (err) {
      setApiError(err.message);
    }
  };

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
              />
            </Form.Group>

            {/* Campo de senha reutilizado do cadastro */}
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
              <Button type="submit" className="btn-principal">
                Entrar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}