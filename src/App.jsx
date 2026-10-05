import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'

import TarjetaProducto from './componentes/TarjetaProducto.jsx'
import { buscarProducto, productos } from './datos/productos.js'

// ETAPA 1 — El problema que React Router viene a resolver.
//
// Esta versión funciona: se puede ver el catálogo y el detalle de un producto.
// Pero toda la aplicación vive en una sola URL. Eso significa que:
//   · no se puede compartir el enlace de un producto,
//   · el botón "atrás" del navegador se sale del sitio,
//   · al recargar (F5) siempre volvemos al catálogo,
//   · no se puede marcar una sección como favorita.
//
// La "navegación" está simulada con una variable de estado.
export default function App() {
  const [vista, setVista] = useState('catalogo')
  const [idSeleccionado, setIdSeleccionado] = useState(null)

  const producto = buscarProducto(idSeleccionado)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#">Lo quieres, te lo vendo</Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => setVista('catalogo')}>Catálogo</Nav.Link>
              <Nav.Link onClick={() => setVista('nosotros')}>Nosotros</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1 py-4">
        <Container>
          <Alert variant="warning">
            Mira la barra de direcciones mientras navegas: <strong>nunca cambia</strong>.
            Ese es el problema que resolveremos hoy.
          </Alert>

          {vista === 'nosotros' && (
            <>
              <h1 className="h3">Nosotros</h1>
              <p>
                Tienda en línea del Equipo 1 para la asignatura Desarrollo
                Fullstack II.
              </p>
            </>
          )}

          {vista === 'detalle' && producto && (
            <>
              <Button
                variant="outline-secondary"
                className="mb-3"
                onClick={() => setVista('catalogo')}
              >
                Volver
              </Button>
              <h1 className="h3">{producto.nombre}</h1>
              <p>{producto.descripcion}</p>
            </>
          )}

          {vista === 'catalogo' && (
            <>
              <h1 className="h3 mb-3">Catálogo</h1>
              <Row xs={1} sm={2} lg={3} className="g-3">
                {productos.map((item) => (
                  <Col key={item.id}>
                    <TarjetaProducto
                      producto={item}
                      onVerDetalle={() => {
                        setIdSeleccionado(item.id)
                        setVista('detalle')
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </main>

      <footer className="bg-dark text-white-50 py-3">
        <Container>&copy; 2026 Lo quieres, te lo vendo — Equipo 1</Container>
      </footer>
    </div>
  )
}
