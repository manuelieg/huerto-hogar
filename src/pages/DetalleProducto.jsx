import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductoService from "../services/ProductoService";
import { usarCarrito } from "../context/GestionCarrito";

const DetalleProducto = () => {
const { id } = useParams();
const [producto, setProducto] = useState(null);
const [loading, setLoading] = useState(true);
const [cantidad, setCantidad] = useState(1);
const { agregarAlCarrito } = usarCarrito();

useEffect(() => {
    const fetchProducto = async () => {
    try {
        const res = await ProductoService.obtenerPorId(id);
        setProducto(res.data);
        if (res.data.unidadMedida === 'KG') {
            setCantidad(0.25);
        } else {
            setCantidad(1);
        }
    } catch (error) {
        console.error("Error al cargar producto:", error);
    } finally {
        setLoading(false);
    }
    };
    fetchProducto();
}, [id]);

if (loading) return <div className="text-center mt-5"><div className="spinner-border text-success"></div></div>;
if (!producto) return <div className="text-center mt-5">Producto no encontrado</div>;

const unidad = producto.unidadMedida || 'UNIDAD';
const esPeso = unidad === 'KG';
const step = esPeso ? 0.25 : 1;

const incrementar = () => {
    if (producto && cantidad < producto.stock) {
    const nueva = cantidad + step;
    setCantidad(esPeso ? parseFloat(nueva.toFixed(2)) : nueva);
    }
};

const decrementar = () => {
    if (cantidad > step) {
    const nueva = cantidad - step;
    setCantidad(esPeso ? parseFloat(nueva.toFixed(2)) : nueva);
    }
};

const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    const btn = document.getElementById('btn-add-detail');
    if(btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Agregado';
        btn.classList.remove('btn-success');
        btn.classList.add('btn-dark');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('btn-dark');
            btn.classList.add('btn-success');
        }, 1500);
    }
};

  const precioTotal = producto.precio * cantidad;
const nombreCategoria = producto.categoria?.nombre || producto.categoria || "General";

return (
    <div className="container mt-5 mb-5">
    <div className="row g-5">
        
        <div className="col-md-6">
        <div className="card border-0 shadow-sm p-3">
            <img
            src={producto.imagen || "/images/placeholder.png"}
            alt={producto.nombre}
            className="img-fluid rounded"
            style={{ objectFit: "contain", maxHeight: "450px", width: "100%" }}
            />
        </div>
        </div>

        <div className="col-md-6">
        <div className="ps-lg-4">
            <span className="badge bg-light text-secondary border mb-2 text-uppercase ls-1">
            {nombreCategoria}
            </span>

            <h1 className="fw-bold display-5 text-dark mb-2">{producto.nombre}</h1>
            
            <div className="mb-3">
            <span className="h2 fw-bold text-success">
                ${new Intl.NumberFormat("es-CL").format(producto.precio)}
            </span>
            <span className="text-muted ms-2">/ {unidad}</span>
            </div>

            <p className="lead text-muted mb-4" style={{ fontSize: "1rem" }}>
            {producto.descripcion || "Sin descripción disponible."}
            </p>

            <div className="card bg-light border-0 rounded-3 p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className={`fw-bold ${producto.stock > 0 ? 'text-success' : 'text-danger'}`}>
                    {producto.stock > 0 ? "Disponible" : "Agotado"}
                </span>
                <small className="text-muted">Stock: {producto.stock} {unidad}</small>
            </div>

            {producto.stock > 0 ? (
                <>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <label className="fw-bold text-dark me-3">Cantidad:</label>
                    
                    <div className="input-group" style={{ width: "140px" }}>
                        <button className="btn btn-outline-secondary bg-white" type="button" onClick={decrementar}>-</button>
                        <input
                        type="text"
                        className="form-control text-center bg-white border-secondary border-start-0 border-end-0"
                        value={cantidad}
                        readOnly
                        />
                        <button className="btn btn-outline-secondary bg-white" type="button" onClick={incrementar}>+</button>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-3">
                    <span>Total a pagar:</span>
                    <span className="fs-4 fw-bold text-dark">
                        ${new Intl.NumberFormat("es-CL").format(Math.round(precioTotal))}
                    </span>
                </div>

                <button 
                    id="btn-add-detail"
                    className="btn btn-success btn-lg w-100 fw-bold shadow-sm transition-btn"
                    onClick={handleAgregar}
                >
                    <i className="bi bi-cart-plus me-2"></i> Añadir al Carrito
                </button>
                </>
            ) : (
                <div className="alert alert-warning text-center m-0">
                    Producto no disponible momentáneamente.
                </div>
            )}
            </div>

            <div className="small text-muted">
                <p className="mb-1"><i className="bi bi-truck me-2"></i> Despacho a todo Santiago</p>
                <p className="mb-0"><i className="bi bi-shield-check me-2"></i> Calidad garantizada de la huerta</p>
            </div>

        </div>
        </div>
    </div>
    </div>
);
};

export default DetalleProducto;
