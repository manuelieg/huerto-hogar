import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {
    const [cantidad, setCantidad] = useState(1);

    const FormatoPrecio = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price);
    };

    // Agregar al carrito
    const AgregarAlCarrito = () => {
        if (cantidad < 1) return;

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert(`${cantidad} x ${producto.nombre} agregado(s) al carrito`);
    };

    const imgSrc = producto.imagen || '/images/placeholder.png';

    return (
        <div className="col mb-4">
            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                
                {/* Imagen */}
                <figure style={{ height: '200px', overflow: 'hidden' }} className="d-flex justify-content-center align-items-center p-3">
                    <Link to={`/productos/${producto.id}`} className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <img 
                            src={imgSrc} 
                            alt={producto.nombre} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </Link>
                </figure>

                <div className="card-body d-flex flex-column text-center pt-0 px-3 pb-2">
                    <h3 className="fs-6 fw-bold mb-1 text-dark">{producto.nombre}</h3>

                    <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                        <span className="text-success fw-bolder fs-5">{FormatoPrecio(producto.precio)}/Kg</span>
                        <span className={`badge border rounded-1 fw-normal px-1 fs-7 lh-1 ${producto.stock > 50 ? 'bg-success-subtle text-success border-success' : 'bg-warning-subtle text-warning border-warning'}`}>
                            Stock: {producto.stock}Kg
                        </span>
                    </div>

                    <p className="text-muted small flex-grow-1">{producto.descripcion}</p>

                    {/* Selector de cantidad y botón */}
                    <div className="d-flex justify-content-center align-items-center gap-2 mt-auto">
                        <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            style={{ width: '60px' }}
                            min={1}
                            max={producto.stock}
                            value={cantidad}
                            onChange={(e) => setCantidad(Math.max(1, Math.min(producto.stock, Number(e.target.value))))}
                        />

                        <button
                            onClick={AgregarAlCarrito}
                            className="btn btn-primary d-flex align-items-center"
                        >
                            <i className="bi bi-cart me-1"></i> Añadir
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;




