import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SideBarDashboard } from '../components/SideBarDashboard/SideBarDashboard'
import {
  DashboardPets,
  DashboardAdotantes,
  DashboardAdocoes,
} from '../components/DashboardContent/DashboardContent'
import { Footer } from '../components/Footer/Footer'

export function Dashboard() {
  const [activePanel, setActivePanel] = useState('pets')

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'pets':
        return <DashboardPets />
      case 'adotantes':
        return <DashboardAdotantes />
      case 'adocoes':
        return <DashboardAdocoes />
      default:
        return <DashboardPets />
    }
  }

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12 col-md-3">
            <SideBarDashboard
              activePanel={activePanel}
              setActivePanel={setActivePanel}
            />
          </div>

          <div className="col-12 col-md-9 content-container">
            {renderPanelContent()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
