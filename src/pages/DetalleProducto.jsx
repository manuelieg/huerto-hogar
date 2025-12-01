import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usarCarrito } from "../context/GestionCarrito.jsx";
import ProductoService from "../services/ProductoService.js";

function DetalleProducto() {
const { id } = useParams();
const { agregarAlCarrito } = usarCarrito();
const [producto, setProducto] = useState(null);
const [cantidad, setCantidad] = useState(1);
const [cargando, setCargando] = useState(true);

useEffect(() => {
    setCargando(true);
    ProductoService.obtenerPorId(id)
    .then((response) => {
        setProducto(response.data);
        setCargando(false);
    })
    .catch((error) => {
        console.error("Error al cargar producto:", error);
        setCargando(false);
    });
}, [id]);

const obtenerUnidad = (prod) => {
    if (!prod) return "";
    const nombre = prod.nombre?.toLowerCase() || "";

    if (
    nombre.includes("mantequilla") ||
    nombre.includes("queso") ||
    nombre.includes("quesillo")
    ) {
    return "g";
    }
    if (
    nombre.includes("leche") ||
    nombre.includes("yogurt") ||
    nombre.includes("aceite") ||
    nombre.includes("té") ||
    nombre.includes("bebida") ||
    nombre.includes("jugo")
    ) {
    return "ml";
    }
    return "kg";
};

function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    }).format(precio);
}

if (cargando) {
    return (
    <div className="container mt-5 text-center">
        <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Buscando tu producto...</p>
    </div>
    );
}

if (!producto) {
    return (
    <div className="container mt-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="btn btn-primary mt-3">
        Volver a la tienda
        </Link>
    </div>
    );
}

const unidad = obtenerUnidad(producto);

return (
    <div className="container mt-5 mb-5">
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <Link to="/productos" className="text-decoration-none text-success">
            Productos
            </Link>
        </li>
        <li className="breadcrumb-item active text-dark" aria-current="page">
            {producto.nombre}
        </li>
        </ol>
    </nav>

    <div className="card shadow-sm border-0 overflow-hidden">
        <div className="row g-0">
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
            <img
            src={producto.imagen || "/images/placeholder.png"}
            alt={producto.nombre}
            className="img-fluid p-4"
            style={{ maxHeight: "500px", objectFit: "contain" }}
            />
        </div>

        <div className="col-md-6">
            <div className="card-body p-4 p-lg-5 d-flex flex-column h-100">
            <h5
                className="text-muted text-uppercase mb-2"
                style={{ fontSize: "0.9rem", letterSpacing: "2px" }}
            >
                {producto.categoria?.nombre || "Sin Categoría"}
            </h5>

            <h1 className="display-5 fw-bolder mb-3">{producto.nombre}</h1>

            <div className="mb-4">
                <span className="display-6 fw-bold text-success me-3">
                {formatearPrecio(producto.precio)} / {unidad}
                </span>

                <span
                className={`badge rounded-pill fs-6 ${
                    producto.stock > 0
                    ? "bg-success-subtle text-success border border-success"
                    : "bg-danger-subtle text-danger border border-danger"
                }`}
                >
                {producto.stock > 0
                    ? `Stock: ${producto.stock} ${unidad}`
                    : "Agotado"}
                </span>
            </div>

            <p className="lead text-muted mb-4">{producto.descripcion}</p>

            <div className="mt-auto">
                <div
                className="d-flex align-items-center gap-3 mb-4"
                style={{ maxWidth: "400px" }}
                >
                <input
                    type="number"
                    className="form-control text-center fs-5"
                    value={cantidad}
                    min="1"
                    max={producto.stock}
                    onChange={(e) =>
                    setCantidad(
                        Math.max(
                        1,
                        Math.min(producto.stock, Number(e.target.value))
                        )
                    )
                    }
                    style={{ width: "80px" }}
                    disabled={producto.stock <= 0}
                />
                <button
                    className="btn btn-dark btn-lg flex-grow-1"
                    onClick={() => agregarAlCarrito(producto, cantidad)}
                    disabled={producto.stock <= 0}
                >
                    <i className="bi bi-cart-plus me-2"></i>
                    {producto.stock > 0 ? "Añadir al Carrito" : "Sin Stock"}
                </button>
                </div>

                <hr />
                <div className="small text-muted">
                <p className="mb-1">
                    <i className="bi bi-truck me-2"></i>Despacho a todo Chile
                </p>
                <p className="mb-0">
                    <i className="bi bi-shield-check me-2"></i>Garantía de
                    calidad Huerto Hogar
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
);
}

export default DetalleProducto;
