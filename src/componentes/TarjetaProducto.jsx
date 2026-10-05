import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { formatearPrecio } from '../datos/productos.js'

// Todavía sin React Router: para "ir al detalle" avisamos al padre con una
// función. Fíjate en lo que pierde esto respecto de un enlace real: no se
// puede abrir en una pestaña nueva ni copiar la dirección.
export default function TarjetaProducto({ producto, onVerDetalle }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="fs-1 text-center" aria-hidden="true">
          {producto.emoji}
        </div>

        <Card.Title as="h3" className="h6">
          {producto.nombre}
        </Card.Title>

        <Badge bg="light" text="dark" className="align-self-start mb-2 text-capitalize">
          {producto.categoria}
        </Badge>

        <Card.Text className="fw-semibold mb-3">
          {formatearPrecio(producto.precio)}
        </Card.Text>

        <div className="mt-auto d-grid">
          <Button variant="outline-primary" onClick={onVerDetalle}>
            Ver detalle
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
