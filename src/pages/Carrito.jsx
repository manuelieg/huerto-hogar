import React from 'react';
import { Link } from 'react-router-dom';
// La importación ya es correcta, usando el hook 'usarCarrito'
import { usarCarrito } from '../context/GestionCarrito.jsx';
import { getAllProducts } from '../data/productos.js';

const Carrito = () => {
  const { articulosCarrito, eliminarDelCarrito, agregarAlCarrito } = usarCarrito();

  const allProducts = getAllProducts();

  const total = articulosCarrito.reduce(
    (acc, item) => acc + item.product.precio * item.quantity,
    0
  );

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const manejarCambioCantidad = (producto, nuevaCantidad) => {
    const itemActual = articulosCarrito.find((item) => item.product.id === producto.id);
    if (!itemActual) return;

    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(producto.id);
    } else {
      const diferencia = nuevaCantidad - itemActual.quantity;
      agregarAlCarrito(producto, diferencia);
    }
  };

  if (articulosCarrito.length === 0) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <i className="bi bi-cart-x display-4 text-muted"></i>
        <h2 className="mt-3">Tu carrito está vacío</h2>
        <p className="text-muted">
          Parece que aún no has añadido nada a tu carrito de compras.
        </p>
        <Link to="/productos" className="btn btn-primary mt-3">
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="fw-bolder mb-4">Tu Carrito de Compras</h1>
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              {articulosCarrito.map((item) => {
                const productSource = allProducts.find((p) => p.id === item.product.id);
                const maxStock = productSource ? productSource.stock : 99;

                return (
                  <div
                    key={item.product.id}
                    className="row align-items-center border-bottom py-3"
                  >
                    <div className="col-md-5 d-flex align-items-center">
                      <img
                        src={item.product.imagen || '/images/placeholder.png'}
                        alt={item.product.nombre}
                        className="img-fluid me-3 rounded"
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                        }}
                      />
                      <div>
                        <h5 className="mb-0 fs-6 fw-bold">{item.product.nombre}</h5>
                        <small className="text-muted">
                          {formatearPrecio(item.product.precio)}/Kg
                        </small>
                      </div>
                    </div>

                    <div className="col-md-2 text-center">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          manejarCambioCantidad(item.product, parseInt(e.target.value, 10))
                        }
                        className="form-control form-control-sm text-center"
                        min="0"
                        max={maxStock}
                        style={{ width: '70px', margin: '0 auto' }}
                      />
                    </div>

                    <div className="col-md-3 text-end fw-bold text-primary">
                      {formatearPrecio(item.product.precio * item.quantity)}
                    </div>

                    <div className="col-md-2 text-end">
                      <button
                        onClick={() => eliminarDelCarrito(item.product.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card shadow-lg border-0 sticky-top"
            style={{ top: '80px' }}
          >
            <div className="card-body">
              <h4 className="card-title fw-bolder mb-4 border-bottom pb-2">
                Resumen del Pedido
              </h4>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatearPrecio(total)}</span>
              </div>

              <div className="d-flex justify-content-between my-3 border-top pt-3">
                <span className="fw-bolder fs-5">Total a Pagar:</span>
                <span className="fw-bolder fs-4 text-success">
                  {formatearPrecio(total)}
                </span>
              </div>

              <Link to="/checkout" className="btn btn-success w-100 fw-bold py-2">
                Procesar Compra{' '}
                <i className="bi bi-arrow-right-circle-fill ms-2"></i>
              </Link>

              <Link to="/productos" className="btn btn-outline-secondary w-100 mt-2">
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
