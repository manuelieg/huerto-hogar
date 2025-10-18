import React from 'react';
import { useParams } from 'react-router-dom';
import { productos } from '../data/productos';

const DetalleProducto = () => {
  const { id } = useParams(); 
  const producto = productos.find(p => p.id === id);

  if (!producto) return <p className="text-center mt-5">Producto no encontrado</p>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          {/* Imagen del producto con tamaño uniforme */}
          <div style={{ height: '450px', overflow: 'hidden', borderRadius: '0.5rem' }}>
            <img
              src={producto.imagen || '/images/placeholder.png'}
              alt={producto.nombre}
              className="img-fluid w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{producto.nombre}</h2>
          <p className="text-success fs-4 fw-bolder">{producto.precio.toLocaleString('es-CL')} /Kg</p>
          <p className="text-muted">{producto.descripcion}</p>

          {/* Agregar cantidad y botón */}
          <div className="d-flex align-items-center gap-2 mt-3">
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="form-control"
              style={{ width: '80px' }}
              onChange={(e) => producto.cantidadTemp = Math.max(1, Number(e.target.value))}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                const cantidad = producto.cantidadTemp || 1;
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const existente = carrito.find(item => item.id === producto.id);
                if (existente) existente.cantidad += cantidad;
                else carrito.push({ ...producto, cantidad });
                localStorage.setItem('carrito', JSON.stringify(carrito));
                alert(`${cantidad} x ${producto.nombre} agregado(s) al carrito`);
              }}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;

