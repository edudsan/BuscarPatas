import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideBarDashboard.css';
import Logo from '../../assets/logo.png'; // Importe sua logo

export function SideBarDashboard({ activePanel, setActivePanel, menuItems = [] }) {
  return (
    <div className="sidebar-content-wrapper">
      {/* --- ADICIONE ESTA SEÇÃO --- */}
      {/* Header do Sidebar (só aparece em telas pequenas com 'd-lg-none') */}
      <div className="sidebar-header d-lg-none">
        <Link to="/">
          <img src={Logo} alt="Buscar Patas" className="sidebar-logo" />
        </Link>
      </div>

      <div className="sidebar-menu-items">
        <h5 className="mb-4 sidebar-title">Bem vindo!</h5>
        <div className="d-flex flex-column">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`py-2 px-3 mb-2 rounded sidebar-item ${activePanel === item.key ? 'sidebar-item-active' : ''}`}
              onClick={() => setActivePanel(item.key)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}