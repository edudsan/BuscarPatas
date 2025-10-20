import { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { PetCreatePanel } from './PetCreatePanel'; // Vamos criar este componente
import { PetEditPanel } from './PetEditPanel'; // O componente que acabamos de criar
import { AdotantesPanel } from '../AdotantesPanel/AdotantesPanel.jsx';
import './DashboardContentAdmin.css';

// --- NOVO COMPONENTE DE MENU ---
function PetManagementMenu({ setView }) {
  return (
    <Container className="p-4 text-center">
      <h2 className="mb-5">Gerenciar Pets</h2>
      <Row className="justify-content-center g-4">
        <Col md={4}>
          <Card className="dashboard-menu-card" onClick={() => setView('create')}>
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
  );
}

// --- LÓGICA PRINCIPAL DO PAINEL DE PETS ---
export function DashboardPets() {
  const [petView, setPetView] = useState('menu'); // 'menu', 'create', 'edit'

  switch (petView) {
    case 'create':
      return <PetCreatePanel onBack={() => setPetView('menu')} />;
    case 'edit':
      return <PetEditPanel onBack={() => setPetView('menu')} />;
    default:
      return <PetManagementMenu setView={setPetView} />;
  }
}

// --- OUTROS PAINÉIS CONTINUAM IGUAIS ---
export function DashboardAdotantes() {
  return <AdotantesPanel />;
}

export function DashboardAdocoes() {
  return (
    <div className="p-4">
      <h2 className="mb-4">Gerenciar Adoções</h2>
      {/* Futuro painel de adoções */}
    </div>
  );
}