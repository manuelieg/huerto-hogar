import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usarCarrito } from '../context/GestionCarrito.jsx'; 

const CartaProducto = ({ producto }) => { 
    
    const [cantidad, setCantidad] = useState(1); 
    
    const { agregarAlCarrito } = usarCarrito();

    const FormatoPrecio = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price);
    };

    const AgregarAlCarrito = () => {
        if (cantidad < 1 || cantidad > producto.stock) {
            console.error("Cantidad inválida o fuera de stock.");
            return;
        }

        agregarAlCarrito(producto, cantidad);
        console.log(`[Carrito OK] ${cantidad} x ${producto.nombre} agregado(s) al carrito.`);
    };
    
    const rutaImagen = producto.imagen || '/images/placeholder.png';
    const stockDisponible = producto.stock || 0;

    return (
        <div className="col mb-4">
            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                
                <figure style={{ height: '200px', overflow: 'hidden' }} className="d-flex justify-content-center align-items-center p-3">
                    <Link to={`/productos/${producto.id}`} className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <img 
                            src={rutaImagen} 
                            alt={producto.nombre} 
                            className="tab-image img-fluid"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </Link>
                </figure>

                <div className="card-body d-flex flex-column text-center pt-0 px-3 pb-2">
                    <h3 className="fs-6 fw-bold mb-1 text-dark">{producto.nombre}</h3>

                    <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                        <span className="text-success fw-bolder fs-5">{FormatoPrecio(producto.precio)}/Kg</span>
                        <span className={`badge border rounded-1 fw-normal px-1 fs-7 lh-1 ${stockDisponible > 50 ? 'bg-success-subtle text-success border-success' : 'bg-warning-subtle text-warning border-warning'}`}>
                            Stock: {stockDisponible}Kg
                        </span>
                    </div>

                    <p className="text-muted small flex-grow-1">{producto.descripcion}</p>

                    <div className="d-flex justify-content-center align-items-center gap-2 mt-auto">
                        <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            style={{ width: '60px' }}
                            min={1}
                            max={stockDisponible}
                            value={cantidad}
                            onChange={(e) => setCantidad(Math.max(1, Math.min(stockDisponible, Number(e.target.value))))}
                            disabled={stockDisponible === 0}
                        />

                        <button
                            onClick={AgregarAlCarrito}
                            className="btn btn-primary d-flex align-items-center rounded-1"
                            disabled={stockDisponible === 0}
                        >
                            <i className="bi bi-cart me-1"></i> {stockDisponible > 0 ? 'Añadir' : 'Agotado'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartaProducto;




