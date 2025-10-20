import { DashboardLayout } from '../components/DashboardLayout/DashboardLayout'
import {
  DashboardNumeros,
  DashboardPets,
  DashboardAdotantes,
  DashboardAdocoes,
} from '../components/DashboardContentAdmin/DashboardContentAdmin'

// Define os itens do menu para o admin
const adminMenuItems = [
  { key: 'numeros', label: 'NOSSOS NÚMEROS' },
  { key: 'pets', label: 'GERENCIAR PETS' },
  { key: 'adotantes', label: 'GERENCIAR ADOTANTES' },
  { key: 'adocoes', label: 'GERENCIAR ADOÇÕES' },
]

// Mapeia a chave do menu para o componente de conteúdo correspondente
const adminContentMap = {
  numeros: DashboardNumeros,
  pets: DashboardPets,
  adotantes: DashboardAdotantes,
  adocoes: DashboardAdocoes,
}

export function DashboardAdmin() {
  return (
    <DashboardLayout
      menuItems={adminMenuItems}
      contentMap={adminContentMap}
      initialPanel="numeros"
    />
  )
}
