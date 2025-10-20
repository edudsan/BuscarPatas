import { DashboardLayout } from '../components/DashboardLayout/DashboardLayout'

import {
  DashboardNumeros,
  DashboardPets,
  DashboardAdotantes,
  DashboardAdocoes,
} from '../components/DashboardContent/DashboardContentAdmin'

const adminMenuItems = [
  { key: 'numeros', label: 'NOSSOS NÚMEROS' },
  { key: 'pets', label: 'PETS' },
  { key: 'adotantes', label: 'ADOTANTES' },
  { key: 'adocoes', label: 'ADOÇÕES' },
]

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
