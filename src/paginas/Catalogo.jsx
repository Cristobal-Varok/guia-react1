import { useSearchParams } from 'react-router'

import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TarjetaProducto from '../componentes/TarjetaProducto.jsx'

import {
  categorias,
  productos,
} from '../datos/productos.js'

export default function Catalogo() {
  const [parametros, setParametros] =
    useSearchParams()

  const textoBuscado =
    parametros.get('buscar') ?? ''

  const categoriaSeleccionada =
    parametros.get('categoria') ?? ''

  function actualizar(nombre, valor) {
    const nuevosParametros =
      new URLSearchParams(parametros)

    if (valor) {
      nuevosParametros.set(nombre, valor)
    } else {
      nuevosParametros.delete(nombre)
    }

    setParametros(nuevosParametros)
  }

  const productosFiltrados =
    productos.filter((producto) => {

      const coincideTexto =
        producto.nombre
          .toLowerCase()
          .includes(textoBuscado.toLowerCase())

      const coincideCategoria =
        !categoriaSeleccionada ||
        producto.categoria === categoriaSeleccionada

      return (
        coincideTexto &&
        coincideCategoria
      )
    })

  return (
    <section>

      <h1 className="h3 mb-4">
        Catálogo
      </h1>

      <div className="row g-3 mb-4">

        <div className="col-12 col-md-7">

          <Form.Label htmlFor="buscar">
            Buscar producto
          </Form.Label>

          <Form.Control
            id="buscar"
            type="search"
            value={textoBuscado}
            placeholder="Ej.: mouse, teclado..."
            onChange={(e) =>
              actualizar(
                'buscar',
                e.target.value,
              )
            }
          />

        </div>

        <div className="col-12 col-md-5">

          <Form.Label htmlFor="categoria">
            Categoría
          </Form.Label>

          <Form.Select
            id="categoria"
            value={categoriaSeleccionada}
            onChange={(e) =>
              actualizar(
                'categoria',
                e.target.value,
              )
            }
          >

            <option value="">
              Todas las categorías
            </option>

            {categorias.map((categoria) => (
              <option
                key={categoria}
                value={categoria}
              >
                {categoria
                  .charAt(0)
                  .toUpperCase() +
                  categoria.slice(1)}
              </option>
            ))}

          </Form.Select>

        </div>

      </div>

      {productosFiltrados.length === 0 ? (

        <Alert variant="info">
          No encontramos productos con esos filtros.
        </Alert>

      ) : (

        <Row
          xs={1}
          sm={2}
          lg={3}
          className="g-3"
        >

          {productosFiltrados.map((producto) => (

            <Col key={producto.id}>

              <TarjetaProducto
                producto={producto}
              />

            </Col>

          ))}

        </Row>

      )}

    </section>
  )
}