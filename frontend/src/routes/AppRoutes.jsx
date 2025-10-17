import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { Sobre } from '../pages/sobre'
import { Cadastro } from '../pages/Cadastro'
import { Login } from '../pages/Login'
import { DashboardAdmin } from '../pages/DashboardAdmin'
import { DashboardUser } from '../pages/DashboardUser'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/sobre" element={<Sobre />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      <Route path="/dashboardUser" element={<DashboardUser />} />
    </Routes>
  )
}
