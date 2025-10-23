import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SideBarDashboard } from '../SideBarDashboard/SideBarDashboard'
import { Footer } from '../../components/Footer/Footer'
import './DashboardLayout.css'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground'

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

  const homeBackgroundImageUrl = '/patinhas.png'

  return (
    <div
      className="dashboard-layout-container"
      style={{ position: 'relative' }}
    >
      <div className="dashboard-wrapper">
        <div
          className={`sidebar-container-wrapper ${sidebarOpen ? 'open' : ''}`}
        >
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

        <main className="content-container-wrapper">
          <Button
            className="sidebar-toggle d-lg-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>

          {renderPanelContent()}
        </main>
      </div>
      <AnimatedBackground
        imageUrl={homeBackgroundImageUrl}
        opacity={0.4}
        isLocalElement={true}
        isCornerImage={true}
        backgroundSize="200px"
      />
      <Footer />
    </div>
  )
}
