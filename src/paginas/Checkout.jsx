import { useState } from 'react'

import {
  Navigate,
  useNavigate,
} from 'react-router'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {
  formatearPrecio,
} from '../datos/productos.js'

export default function Checkout({
  carrito,
  onVaciar,
}) {

  const navegar = useNavigate()

  const [confirmado, setConfirmado] =
    useState(false)

  // Proteger la ruta
  if (carrito.length === 0) {
    return (
      <Navigate
        to="/carrito"
        replace
      />
    )
  }

  const total = carrito.reduce(
    (suma, item) =>
      suma +
      item.precio * item.cantidad,
    0,
  )

  function finalizarCompra(e) {

    e.preventDefault()

    setConfirmado(true)

    onVaciar()
  }

  if (confirmado) {

    return (
      <section>

        <Alert variant="success">

          Compra simulada realizada
          correctamente.

          <br />

          ¡Gracias por tu compra!

        </Alert>

        <Button
          onClick={() =>
            navegar('/catalogo')
          }
          variant="primary"
        >
          Volver al catálogo
        </Button>

      </section>
    )
  }

  return (
    <section>

      <h1 className="h3 mb-3">
        Checkout
      </h1>

      <p>
        Total de la compra:{' '}

        <strong>
          {formatearPrecio(total)}
        </strong>
      </p>

      <Form
        onSubmit={finalizarCompra}
        className="mt-4"
        style={{ maxWidth: 600 }}
      >

        <Form.Group
          className="mb-3"
          controlId="nombre"
        >

          <Form.Label>
            Nombre
          </Form.Label>

          <Form.Control
            required
            placeholder="Tu nombre"
          />

        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="correo"
        >

          <Form.Label>
            Correo electrónico
          </Form.Label>

          <Form.Control
            type="email"
            required
            placeholder="correo@ejemplo.cl"
          />

        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="direccion"
        >

          <Form.Label>
            Dirección
          </Form.Label>

          <Form.Control
            required
            placeholder="Dirección de entrega"
          />

        </Form.Group>

        <Button
          type="submit"
          variant="success"
        >
          Confirmar compra
        </Button>

      </Form>

    </section>
  )
}