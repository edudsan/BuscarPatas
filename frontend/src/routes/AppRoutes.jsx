import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { Sobre } from '../pages/sobre'
import { Cadastro } from '../pages/Cadastro'
import { Login } from '../pages/Login'
import { Dashboard } from '../pages/Dashboard'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/sobre" element={<Sobre />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
