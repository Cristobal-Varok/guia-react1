import { Outlet } from 'react-router'
import Container from 'react-bootstrap/Container'

import BarraNavegacion from './BarraNavegacion.jsx'
import PiePagina from './PiePagina.jsx'

export default function Layout({ carrito }) {
  return (
    <div className="d-flex flex-column min-vh-100">

      <BarraNavegacion carrito={carrito} />

      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>

      <PiePagina />

    </div>
  )
}