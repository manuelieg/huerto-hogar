import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ productos }) => {
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem('carrito')) || []
  );

  const handleAddToCart = (producto, cantidad) => {
    if (cantidad < 1) return;

    const copiaCarrito = [...carrito];
    const existente = copiaCarrito.find(item => item.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      copiaCarrito.push({ ...producto, cantidad });
    }

    setCarrito(copiaCarrito);
    localStorage.setItem('carrito', JSON.stringify(copiaCarrito));
    alert(`${cantidad} x ${producto.nombre} agregado(s) al carrito`);
  };

  return (
    <div className="row">
      {productos.map(producto => (
        <div key={producto.id} className="col-6 col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
            <figure style={{ height: '200px', overflow: 'hidden' }} className="d-flex justify-content-center align-items-center p-3">
              <Link to={`/productos/${producto.id}`} className="w-100 h-100 d-flex justify-content-center align-items-center">
                <img 
                  src={producto.imagen || '/images/placeholder.png'}
                  alt={producto.nombre} 
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </figure>

            <div className="card-body d-flex flex-column text-center pt-0 px-3 pb-2">
              <h5 className="fw-bold mb-1">{producto.nombre}</h5>
              <p className="text-success fw-bolder mb-2">{producto.precio.toLocaleString('es-CL')} /Kg</p>
              <p className="text-muted small flex-grow-1">{producto.descripcion}</p>

              <div className="d-flex justify-content-center align-items-center gap-2 mt-auto">
                <input 
                  type="number" 
                  min={1} 
                  defaultValue={1} 
                  className="form-control form-control-sm text-center" 
                  style={{ width: '60px' }}
                  onChange={(e) => producto.cantidadTemp = Math.max(1, Number(e.target.value))}
                />
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(producto, producto.cantidadTemp || 1)}
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

