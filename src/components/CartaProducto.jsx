import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usarCarrito } from "../context/GestionCarrito.jsx";
import "./CartaProducto.css";

function CartaProducto({ producto }) {

const unidad = producto.unidadMedida || "UNIDAD";
const esPeso = unidad === "KG";

const step = esPeso ? 0.25 : 1;
const cantidadInicial = esPeso ? 0.25 : 1;

const [cantidad, setCantidad] = useState(cantidadInicial);
const [isAdded, setIsAdded] = useState(false);
const { agregarAlCarrito } = usarCarrito();

const stockDisponible = producto.stock || 0;
const sinStock = stockDisponible === 0;
const rutaImagen = producto.imagen || "/images/placeholder.png";

const formatearPrecio = (price) =>
    new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    }).format(price);

const incrementar = () => {
    const nuevaCantidad = cantidad + step;
    if (nuevaCantidad <= stockDisponible) {
        setCantidad(esPeso ? parseFloat(nuevaCantidad.toFixed(2)) : nuevaCantidad);
    }
};

const decrementar = () => {
    const nuevaCantidad = cantidad - step;
    if (nuevaCantidad >= step) {
        setCantidad(esPeso ? parseFloat(nuevaCantidad.toFixed(2)) : nuevaCantidad);
    }
};

const manejarAgregar = () => {
    if (sinStock) return;
    
    agregarAlCarrito(producto, cantidad);
    
    setIsAdded(true);
    setTimeout(() => {
    setIsAdded(false);
    setCantidad(cantidadInicial);
    }, 1500);
};

return (
    <div className="col mb-4">
    <div className={`card h-100 border-0 shadow-sm product-card ${sinStock ? "out-of-stock" : ""}`}>
        
        <div className="position-relative overflow-hidden card-img-wrapper">
        {!sinStock && (
            <span className={`position-absolute top-0 end-0 m-2 badge rounded-pill ${stockDisponible < 20 ? 'bg-warning text-dark' : 'bg-light text-secondary border'}`}>
            Stock: {stockDisponible} {unidad}
            </span>
        )}
        
        {sinStock && (
            <div className="overlay-agotado d-flex align-items-center justify-content-center">
            <span className="badge bg-danger fs-6">AGOTADO</span>
            </div>
        )}

        <Link to={`/productos/${producto.id}`} className="d-block bg-white p-3" style={{height: "220px"}}>
            <img
            src={rutaImagen}
            alt={producto.nombre}
            className="w-100 h-100"
            style={{ objectFit: "contain", transition: "transform 0.3s ease" }}
            />
        </Link>
        </div>

        <div className="card-body d-flex flex-column p-3">
        <div className="mb-2">
            <small className="text-muted text-uppercase" style={{fontSize: "0.75rem"}}>
                {producto.categoria?.nombre || producto.categoria || "General"}
            </small>
            <h5 className="card-title fw-bold text-dark mb-0 text-truncate" title={producto.nombre}>
                <Link to={`/productos/${producto.id}`} className="text-decoration-none text-dark">
                    {producto.nombre}
                </Link>
            </h5>
        </div>

        <p className="card-text text-muted small flex-grow-1" style={{minHeight: "40px"}}>
            {producto.descripcion ? (producto.descripcion.length > 55 ? producto.descripcion.substring(0, 55) + "..." : producto.descripcion) : "Sin descripción."}
        </p>

        <div className="d-flex justify-content-between align-items-end mt-3 mb-3 border-top pt-3">
            <div className="price-tag">
                <span className="fs-5 fw-bold text-success">{formatearPrecio(producto.precio)}</span>
                <span className="text-muted small ms-1">/ {unidad}</span>
            </div>
        </div>

        <div className="d-flex gap-2">
            {!sinStock ? (
                <>
                    <div className="input-group input-group-sm quantity-stepper" style={{width: "100px"}}>
                        <button className="btn btn-outline-secondary" type="button" onClick={decrementar}>-</button>
                        <input 
                            type="text" 
                            className="form-control text-center bg-white border-secondary border-start-0 border-end-0 px-0" 
                            value={cantidad} 
                            readOnly 
                        />
                        <button className="btn btn-outline-secondary" type="button" onClick={incrementar}>+</button>
                    </div>

                    <button 
                        className={`btn btn-sm w-100 fw-bold d-flex align-items-center justify-content-center transition-btn ${isAdded ? "btn-success" : "btn-primary"}`}
                        onClick={manejarAgregar}
                        disabled={isAdded}
                    >
                        {isAdded ? (
                            <>
                                <i className="bi bi-check-lg me-1"></i> Listo
                            </>
                        ) : (
                            <>
                                <i className="bi bi-basket me-1"></i> Añadir
                            </>
                        )}
                    </button>
                </>
            ) : (
                <button className="btn btn-secondary w-100 btn-sm" disabled>Sin Stock</button>
            )}
        </div>
        </div>
    </div>
    </div>
);
}

export default CartaProducto;