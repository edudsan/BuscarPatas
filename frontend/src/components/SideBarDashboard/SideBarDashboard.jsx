import 'bootstrap/dist/css/bootstrap.min.css'
import './SideBarDashboard.css'

export function SideBarDashboard({
  activePanel,
  setActivePanel,
  menuItems = [],
}) {
  return (
    <div className="p-3 d-flex flex-column sidebar-container">
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
  )
}
