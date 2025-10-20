import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SideBarDashboard } from '../SideBarDashboard/SideBarDashboard'
import { Footer } from '../../components/Footer/Footer'
import '../../components/DashboardContent/DashboardContentAdmin'
import './DashboardLayout.css'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './DashboardLayout.css'

export function DashboardLayout({ menuItems = [], contentMap, initialPanel }) {
  const [activePanel, setActivePanel] = useState(initialPanel)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPanelContent = () => {
    const ContentComponent = contentMap[activePanel]
    return ContentComponent ? <ContentComponent /> : null
  }

  const handleSelectPanel = (panelKey) => {
    setActivePanel(panelKey)
    setSidebarOpen(false)
  }

  return (
    <>
      <div className={`sidebar-container-wrapper ${sidebarOpen ? 'open' : ''}`}>
        <SideBarDashboard
          activePanel={activePanel}
          setActivePanel={handleSelectPanel}
          menuItems={menuItems}
        />
      </div>
      {sidebarOpen && (
        <div
          className="overlay d-lg-none"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <Button>
        <FontAwesomeIcon icon={faBars} />
      </Button>

      <main className="content-container-wrapper">
        <h1 className="titulo-painel text-center py-3 display-6">
          Painel administrativo - Buscar Patas
        </h1>
        {renderPanelContent()}
      </main>

      <Footer />
    </>
  )
}
