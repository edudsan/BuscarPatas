// components/DashboardLayout/DashboardLayout.jsx

import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SideBarDashboard } from '../SideBarDashboard/SideBarDashboard'
import { Footer } from '../../components/Footer/Footer'
import '../../components/DashboardContent/DashboardContentAdmin'

export function DashboardLayout({ menuItems = [], contentMap, initialPanel }) {
  const defaultPanel =
    initialPanel || (menuItems.length > 0 ? menuItems[0].key : null)
  const [activePanel, setActivePanel] = useState(defaultPanel)

  const renderPanelContent = () => {
    const ContentComponent = contentMap[activePanel]
    const DefaultContentComponent = contentMap[defaultPanel]

    return ContentComponent ? (
      <ContentComponent />
    ) : DefaultContentComponent ? (
      <DefaultContentComponent />
    ) : null
  }

  if (!defaultPanel) {
    return (
      <div>
        Configuração de Dashboard inválida: Nenhum item de menu fornecido.
      </div>
    )
  }

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12 col-md-3">
            <SideBarDashboard
              activePanel={activePanel}
              setActivePanel={setActivePanel}
              menuItems={menuItems}
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
