import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import {
  useNavigate,
  useParams,
} from 'react-router'

import {
  buscarProducto,
  formatearPrecio,
} from '../datos/productos.js'

export default function DetalleProducto({
  onAgregar,
}) {

  const { id } = useParams()

  const navegar = useNavigate()

  const producto = buscarProducto(id)

  // Si el producto no existe
  if (!producto) {

    return (
      <>

        <Alert variant="warning">

          No encontramos el producto con id{' '}

          <strong>
            {id}
          </strong>

          .

        </Alert>

        <Button
          variant="outline-secondary"
          onClick={() => navegar(-1)}
        >
          Volver
        </Button>

      </>
    )
  }

  function agregar() {

    onAgregar(producto)

    navegar('/carrito')
  }

  return (
    <Card className="shadow-sm">

      <Card.Body>

        <Button
          variant="outline-secondary"
          className="mb-3"
          onClick={() => navegar(-1)}
        >
          Volver
        </Button>

        <div
          className="display-1 text-center mb-3"
          aria-hidden="true"
        >
          {producto.emoji}
        </div>

        <h1 className="h3">
          {producto.nombre}
        </h1>

        <p className="text-capitalize text-muted">
          Categoría: {producto.categoria}
        </p>

        <p>
          {producto.descripcion}
        </p>

        <p className="fs-4 fw-bold">
          {formatearPrecio(producto.precio)}
        </p>

        <p>
          Stock disponible:{' '}
          <strong>
            {producto.stock}
          </strong>
        </p>

        <Button
          variant="primary"
          onClick={agregar}
          disabled={producto.stock === 0}
        >
          {producto.stock === 0
            ? 'Sin stock'
            : 'Agregar al carrito'}
        </Button>

      </Card.Body>

    </Card>
  )
}