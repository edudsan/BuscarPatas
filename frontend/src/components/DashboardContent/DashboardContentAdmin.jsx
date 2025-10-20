import 'bootstrap/dist/css/bootstrap.min.css'
import './DashboardContentAdmin.css'
import { CardNumero } from '../NumerosCard/NumerosCard'

export function DashboardNumeros() {
  return (
    <div className="container">
      <h2 className="display-6 fs-2 text-center fw-semibold">Nossos Números</h2>
      <CardNumero
        titulo="Total de adotantes cadastrados:"
        numero={35}
        imagem="https://images.unsplash.com/photo-1610573501131-a9766c02001a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
        inverter={true}
      />
      <CardNumero
        titulo="Total de pets cadastrados:"
        numero={50}
        imagem="https://images.unsplash.com/photo-1469569946320-b4f13e4b7d5e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
      />
      <CardNumero
        titulo="Total de pets adotados:"
        numero={20}
        imagem="https://plus.unsplash.com/premium_photo-1731629278699-a0c9610babe2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870"
        inverter={true}
      />
      <CardNumero
        titulo="Total de pets aguardando adoção:"
        numero={30}
        imagem="https://plus.unsplash.com/premium_photo-1668114375111-e90b5e975df6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=869"
      />
    </div>
  )
}

export function DashboardPets() {
  return (
    <div className="p-4">
      <h2 className="text-dark">Dashboard: PETS</h2>
    </div>
  )
}

export function DashboardAdotantes() {
  return (
    <div className="p-4">
      <h1 className="text-dark">Dashboard: ADOTANTES</h1>
    </div>
  )
}

export function DashboardAdocoes() {
  return (
    <div className="p-4">
      <h1 className="text-dark">Dashboard: ADOÇÕES</h1>
    </div>
  )
}
