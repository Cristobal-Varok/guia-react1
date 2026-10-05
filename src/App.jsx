import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'

import Layout from './componentes/Layout.jsx'

import Inicio from './paginas/Inicio.jsx'
import Catalogo from './paginas/Catalogo.jsx'
import Nosotros from './paginas/Nosotros.jsx'
import DetalleProducto from './paginas/DetalleProducto.jsx'
import Carrito from './paginas/Carrito.jsx'
import Checkout from './paginas/Checkout.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'

function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem('lqtlv-carrito')

    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

export default function App() {
  const [carrito, setCarrito] = useState(leerCarritoGuardado)

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem(
      'lqtlv-carrito',
      JSON.stringify(carrito),
    )
  }, [carrito])

  // Agregar producto
  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existe = actual.find(
        (item) => item.id === producto.id,
      )

      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        )
      }

      return [
        ...actual,
        {
          ...producto,
          cantidad: 1,
        },
      ]
    })
  }

  // Cambiar cantidad
  function cambiarCantidad(id, cantidad) {
    if (cantidad < 1) {
      quitarDelCarrito(id)
      return
    }

    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad,
            }
          : item,
      ),
    )
  }

  // Quitar producto
  function quitarDelCarrito(id) {
    setCarrito((actual) =>
      actual.filter((item) => item.id !== id),
    )
  }

  // Vaciar carrito
  function vaciarCarrito() {
    setCarrito([])
  }

  return (
    <Routes>

      {/* Layout general */}
      <Route
        path="/"
        element={<Layout carrito={carrito} />}
      >

        {/* Inicio */}
        <Route
          index
          element={<Inicio />}
        />

        {/* Catálogo */}
        <Route
          path="catalogo"
          element={<Catalogo />}
        />

        {/* Nosotros */}
        <Route
          path="nosotros"
          element={<Nosotros />}
        />

        {/* Detalle de producto */}
        <Route
          path="producto/:id"
          element={
            <DetalleProducto
              onAgregar={agregarAlCarrito}
            />
          }
        />

        {/* Carrito */}
        <Route
          path="carrito"
          element={
            <Carrito
              carrito={carrito}
              onCambiarCantidad={cambiarCantidad}
              onQuitar={quitarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          }
        />

        {/* Checkout */}
        <Route
          path="checkout"
          element={
            <Checkout
              carrito={carrito}
              onVaciar={vaciarCarrito}
            />
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NoEncontrada />}
        />

      </Route>
    </Routes>
  )
}