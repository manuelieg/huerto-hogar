import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productos } from '../data/productos.js'; 

const DetalleProducto = ({ onAddToCart }) => { 
    const { id } = useParams(); 
    const [cantidad, setCantidad] = useState(1); 
    const producto = productos.find(p => p.id === id);
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price);
    };

    const handleAddToCart = () => {
        if (cantidad < 1 || !producto) return;

        if (onAddToCart) {
            onAddToCart(producto, cantidad);
            console.log(`[Detalle] Añadido ${cantidad}x ${producto.nombre} al carrito.`);
        }
    };
    
    if (!producto) {
        return (
            <div className="container mt-5 pt-5 text-center">
                <i className="bi bi-x-circle display-4 text-danger mb-3"></i>
                <h2 className="mt-3">Producto No Encontrado</h2>
                <Link to="/productos" className="btn btn-primary mt-3">Volver al Catálogo</Link>
            </div>
        );
    }
    
    const imgSrc = producto.imagen || '/images/placeholder.png';
    const stockDisponible = producto.stock || 0;

    return (
        <div className="container my-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/productos" className="text-decoration-none">Productos</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
                </ol>
            </nav>

            <div className="row g-5">
                
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-3 p-4">
                        <img 
                            src={imgSrc} 
                            alt={producto.nombre} 
                            className="img-fluid rounded-3"
                            style={{ maxHeight: '450px', objectFit: 'contain' }}
                        />
                    </div>
                </div>

                <div className="col-md-6 col-lg-7">
                    <h1 className="fw-bolder mb-2">{producto.nombre}</h1>
                    <p className="text-muted fs-5 mb-4">{producto.categoria}</p>

                    <div className="d-flex align-items-center mb-4 border-bottom pb-3">
                        <span className="text-success fw-bolder display-6 me-4">{formatPrice(producto.precio)}/Kg</span>
                        <span className={`badge fs-6 py-2 px-3 ${stockDisponible > 100 ? 'bg-success text-white' : 'bg-warning text-dark'}`}>
                            Stock: {stockDisponible} Kg
                        </span>
                    </div>

                    <p className="lead text-dark mb-4">{producto.descripcion}</p>
                    
                    <div className="d-flex align-items-center gap-3 mt-4 p-3 border rounded-3 bg-light">
                        
                        <input
                            type="number"
                            className="form-control form-control-lg text-center"
                            style={{ maxWidth: '100px' }}
                            min={1}
                            max={stockDisponible}
                            value={cantidad}
                            disabled={stockDisponible === 0}
                            onChange={(e) => setCantidad(Math.max(1, Math.min(stockDisponible, Number(e.target.value))))}
                        />

                        <button
                            onClick={handleAddToCart}
                            className="btn btn-primary btn-lg d-flex align-items-center flex-grow-1"
                            disabled={stockDisponible === 0}
                        >
                            <i className="bi bi-cart-fill me-2"></i> 
                            {stockDisponible > 0 ? `Añadir ${cantidad} Kg` : 'Agotado'}
                        </button>
                    </div>

                    <div className="mt-4 pt-3 border-top">
                        <p className="small text-muted mb-1">SKU: {producto.id}</p>
                        <p className="small text-muted">Envío en 24 horas.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;

