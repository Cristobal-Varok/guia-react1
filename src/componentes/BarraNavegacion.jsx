import { useState } from 'react'
import { NavLink } from 'react-router'

import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function BarraNavegacion({ carrito }) {
  const [abierta, setAbierta] = useState(false)

  const cerrar = () => {
    setAbierta(false)
  }

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  )

  const enlaceActivo = ({ isActive }) =>
    isActive ? 'active' : undefined

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      expanded={abierta}
      onToggle={setAbierta}
    >
      <Container>

        <Navbar.Brand
          as={NavLink}
          to="/"
          onClick={cerrar}
        >
          Lo quieres, te lo vendo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">

          <Nav className="ms-auto align-items-lg-center">

            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={enlaceActivo}
              onClick={cerrar}
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/catalogo"
              className={enlaceActivo}
              onClick={cerrar}
            >
              Catálogo
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/nosotros"
              className={enlaceActivo}
              onClick={cerrar}
            >
              Nosotros
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/carrito"
              className={enlaceActivo}
              onClick={cerrar}
            >
              Carrito{' '}

              <Badge bg="primary" pill>
                {cantidadTotal}
              </Badge>

            </Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}