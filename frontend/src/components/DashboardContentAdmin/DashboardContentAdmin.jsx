import 'bootstrap/dist/css/bootstrap.min.css'
import './DashboardContentAdmin.css'
import { CardNumero } from '../NumerosCard/NumerosCard.jsx'
import { useState } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { PetCreatePanel } from './PetCreatePanel.jsx'
import { PetEditPanel } from './PetEditPanel.jsx'
import { AdotantesPanel } from '../AdotantesPanel/AdotantesPanel.jsx'
import './DashboardContentAdmin.css'

export function DashboardNumeros() {
  return (
    <div className="container">
      <h2 className="display-6 fs-2 text-center fw-semibold">Nossos Números</h2>
      <CardNumero
        titulo="Total de adotantes cadastrados:"
        numero={35}
        imagem="https://images.unsplash.com/photo-1610573501131-a9766c02001a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
        inverter={true}
      />
      <CardNumero
        titulo="Total de pets cadastrados:"
        numero={50}
        imagem="https://images.unsplash.com/photo-1469569946320-b4f13e4b7d5e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
      />
      <CardNumero
        titulo="Total de pets adotados:"
        numero={20}
        imagem="https://plus.unsplash.com/premium_photo-1731629278699-a0c9610babe2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
        inverter={true}
      />
      <CardNumero
        titulo="Total de pets aguardando adoção:"
        numero={30}
        imagem="https://plus.unsplash.com/premium_photo-1668114375111-e90b5e975df6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=869"
      />
    </div>
  )
}

function PetManagementMenu({ setView }) {
  return (
    <Container className="p-4 text-center">
      <h2 className="mb-5">Gerenciar Pets</h2>
      <Row className="justify-content-center g-4">
        <Col md={4}>
          <Card
            className="dashboard-menu-card"
            onClick={() => setView('create')}
          >
            <Card.Body>
              <Card.Title>Cadastrar Novo Pet</Card.Title>
              <Card.Text>Adicionar um novo pet ao sistema.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-menu-card" onClick={() => setView('edit')}>
            <Card.Body>
              <Card.Title>Editar Pet Existente</Card.Title>
              <Card.Text>Editar informações de um pet.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export function DashboardPets() {
  const [petView, setPetView] = useState('menu') // 'menu', 'create', 'edit'

  switch (petView) {
    case 'create':
      return <PetCreatePanel onBack={() => setPetView('menu')} />
    case 'edit':
      return <PetEditPanel onBack={() => setPetView('menu')} />
    default:
      return <PetManagementMenu setView={setPetView} />
  }
}

export function DashboardAdotantes() {
  return <AdotantesPanel />
}

export function DashboardAdocoes() {
  return (
    <div className="p-4">
      <h2 className="mb-4">Gerenciar Adoções</h2>
      {/* Futuro painel de adoções */}
    </div>
  )
}
