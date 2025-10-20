import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout/DashboardLayout';
import {
  DashboardPets,
  DashboardAdotantes,
  DashboardAdocoes,
} from '../components/DashboardContent/DashboardContentAdmin';

// Define os itens do menu para o admin
const adminMenuItems = [
  { key: 'pets', label: 'GERENCIAR PETS' },
  { key: 'adotantes', label: 'GERENCIAR ADOTANTES' },
  { key: 'adocoes', label: 'GERENCIAR ADOÇÕES' },
];

// Mapeia a chave do menu para o componente de conteúdo correspondente
const adminContentMap = {
  pets: DashboardPets,
  adotantes: DashboardAdotantes,
  adocoes: DashboardAdocoes,
};

export function DashboardAdmin() {
  return (
    <DashboardLayout
      menuItems={adminMenuItems}
      contentMap={adminContentMap}
      initialPanel="pets" // Define qual painel abrir por padrão
    />
  );
}