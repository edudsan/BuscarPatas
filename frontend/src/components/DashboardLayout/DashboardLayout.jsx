import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SideBarDashboard } from '../SideBarDashboard/SideBarDashboard';
import './DashboardLayout.css';

export function DashboardLayout({ menuItems = [], contentMap, initialPanel }) {
  const [activePanel, setActivePanel] = useState(initialPanel);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPanelContent = () => {
    const ContentComponent = contentMap[activePanel];
    return ContentComponent ? <ContentComponent /> : null;
  };

  const handleSelectPanel = (panelKey) => {
    setActivePanel(panelKey);
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-wrapper">
      <Button
        className="sidebar-toggle d-lg-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>

      <div className={`sidebar-container-wrapper ${sidebarOpen ? 'open' : ''}`}>
        <SideBarDashboard
          activePanel={activePanel}
          setActivePanel={handleSelectPanel}
          menuItems={menuItems}
        />
      </div>

      {sidebarOpen && <div className="overlay d-lg-none" onClick={() => setSidebarOpen(false)}></div>}

      <main className="content-container-wrapper">
        {renderPanelContent()}
      </main>
    </div>
  );
}