import React from 'react'
import { DashboardLayout } from '../components/DashboardLayout/DashboardLayout'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  DashboardMinhasAdocoes,
  DashboardBuscarPets,
} from '../components/DashboardContentUser/DashboardContentUser'

const userMenuItems = [
  { key: 'buscar-pets', label: 'BUSCAR PETS' },
  { key: 'minhas-adocoes', label: 'MINHAS ADOÇÕES' },
]

const userContentMap = {
  'buscar-pets': DashboardBuscarPets,
  'minhas-adocoes': DashboardMinhasAdocoes,
}

export function DashboardUser() {
  return (
    <DashboardLayout
      menuItems={userMenuItems}
      contentMap={userContentMap}
      initialPanel="buscar-pets"
    />
  )
}
