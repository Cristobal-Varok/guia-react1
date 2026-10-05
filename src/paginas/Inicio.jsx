import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'

export default function Inicio() {
  return (
    <section className="py-4">

      <h1 className="display-5 fw-bold">
        Lo quieres, te lo vendo
      </h1>

      <p className="lead">
        Tienda en línea del Equipo 1 para la
        asignatura Desarrollo Fullstack II.
      </p>

      <Button
        as={Link}
        to="/catalogo"
        variant="primary"
      >
        Ver catálogo
      </Button>

    </section>
  )
}