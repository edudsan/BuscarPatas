import React from 'react'
import { DashboardLayout } from '../components/DashboardLayout/DashboardLayout'

import {
  DashboardPets,
  DashboardAdotantes,
  DashboardAdocoes,
} from '../components/DashboardContent/DashboardContentAdmin'

const adminMenuItems = [
  { key: 'pets', label: 'PETS' },
  { key: 'adotantes', label: 'ADOTANTES' },
  { key: 'adocoes', label: 'ADOÇÕES' },
]

const adminContentMap = {
  pets: DashboardPets,
  adotantes: DashboardAdotantes,
  adocoes: DashboardAdocoes,
}

export function DashboardAdmin() {
  return (
    <DashboardLayout
      menuItems={adminMenuItems}
      contentMap={adminContentMap}
      initialPanel="pets"
    />
  )
}
