import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home'
import { Sobre } from '../pages/sobre'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  )
}
