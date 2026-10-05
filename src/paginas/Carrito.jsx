import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

import { Link } from 'react-router'

import {
  formatearPrecio,
} from '../datos/productos.js'

export default function Carrito({
  carrito,
  onCambiarCantidad,
  onQuitar,
  onVaciar,
}) {

  const total = carrito.reduce(
    (suma, item) =>
      suma +
      item.precio * item.cantidad,
    0,
  )

  // Carrito vacío
  if (carrito.length === 0) {

    return (
      <section>

        <h1 className="h3 mb-3">
          Carrito
        </h1>

        <Alert variant="info">
          Tu carrito está vacío.
        </Alert>

        <Button
          as={Link}
          to="/catalogo"
          variant="primary"
        >
          Ir al catálogo
        </Button>

      </section>
    )
  }

  return (
    <section>

      <div className="d-flex justify-content-between align-items-center mb-3 gap-2">

        <h1 className="h3 mb-0">
          Carrito
        </h1>

        <Button
          variant="outline-danger"
          onClick={onVaciar}
        >
          Vaciar carrito
        </Button>

      </div>

      <Card className="shadow-sm">

        <ListGroup variant="flush">

          {carrito.map((item) => (

            <ListGroup.Item
              key={item.id}
            >

              <div className="row align-items-center g-3">

                <div className="col-12 col-md-5">

                  <div className="fw-semibold">
                    {item.emoji}{' '}
                    {item.nombre}
                  </div>

                  <small className="text-muted">
                    {formatearPrecio(item.precio)}
                    {' '}c/u
                  </small>

                </div>

                <div className="col-7 col-md-3">

                  <Form.Label
                    className="small"
                    htmlFor={`cantidad-${item.id}`}
                  >
                    Cantidad
                  </Form.Label>

                  <Form.Control
                    id={`cantidad-${item.id}`}
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) =>
                      onCambiarCantidad(
                        item.id,
                        Number(e.target.value),
                      )
                    }
                  />

                </div>

                <div className="col-5 col-md-2 text-md-end fw-semibold">

                  {formatearPrecio(
                    item.precio *
                      item.cantidad,
                  )}

                </div>

                <div className="col-12 col-md-2 text-md-end">

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      onQuitar(item.id)
                    }
                  >
                    Quitar
                  </Button>

                </div>

              </div>

            </ListGroup.Item>

          ))}

        </ListGroup>

        <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

          <div className="fs-5">

            Total:{' '}

            <strong>
              {formatearPrecio(total)}
            </strong>

          </div>

          <Button
            as={Link}
            to="/checkout"
            variant="success"
          >
            Continuar al checkout
          </Button>

        </Card.Body>

      </Card>

    </section>
  )
}