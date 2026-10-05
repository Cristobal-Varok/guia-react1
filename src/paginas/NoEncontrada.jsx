import Button from 'react-bootstrap/Button'

import {
  Link,
  useLocation,
} from 'react-router'

export default function NoEncontrada() {

  const ubicacion = useLocation()

  return (
    <section className="text-center py-5">

      <h1 className="display-4">
        404
      </h1>

      <h2 className="h4">
        Página no encontrada
      </h2>

      <p>
        No encontramos nada en{' '}
        <code>
          {ubicacion.pathname}
        </code>
      </p>

      <Button
        as={Link}
        to="/"
        variant="primary"
      >
        Volver al inicio
      </Button>

    </section>
  )
}