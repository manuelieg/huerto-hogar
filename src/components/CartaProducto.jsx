import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usarCarrito } from "../context/GestionCarrito.jsx";
import "./CartaProducto.css";

function CartaProducto({ producto }) {
const [cantidad, setCantidad] = useState(1);
const [isAdded, setIsAdded] = useState(false);
const { agregarAlCarrito } = usarCarrito();

const obtenerUnidad = (prod) => {
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

const unidad = obtenerUnidad(producto);

function FormatoPrecio(price) {
    return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    }).format(price);
}

function AgregarAlCarrito() {
    if (cantidad < 1 || cantidad > producto.stock) {
    console.error("Cantidad inválida o fuera de stock.");
    return;
    }

    agregarAlCarrito(producto, cantidad);
    console.log(
    `[Carrito OK] ${cantidad} x ${producto.nombre} agregado(s) al carrito.`
    );

    setIsAdded(true);
    setTimeout(() => {
    setIsAdded(false);
    setCantidad(1);
    }, 2000);
}

const rutaImagen = producto.imagen || "/images/placeholder.png";
const stockDisponible = producto.stock || 0;

return (
    <div className="col mb-4">
    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
        <figure
        style={{ height: "200px", overflow: "hidden" }}
        className="d-flex justify-content-center align-items-center p-3 mb-0"
        >
        <Link
            to={`/productos/${producto.id}`}
            className="w-100 h-100 d-flex justify-content-center align-items-center"
        >
            <img
            src={rutaImagen}
            alt={producto.nombre}
            className="tab-image img-fluid"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
        </Link>
        </figure>

        <div className="card-body d-flex flex-column text-center pt-0 px-3 pb-3">
        <h3 className="fs-6 fw-bold mb-2 text-dark">{producto.nombre}</h3>

        <div className="text-success fw-bolder fs-5 mb-1">
            {FormatoPrecio(producto.precio)} / {unidad}
        </div>

        <div className="mb-3">
            <span
            className={`badge border rounded-pill fw-normal px-2 fs-7 ${
                stockDisponible > 50
                ? "bg-light text-secondary border-secondary-subtle"
                : "bg-warning-subtle text-warning-emphasis border-warning"
            }`}
            >
            Stock: {stockDisponible} {unidad}
            </span>
        </div>

        <p className="text-muted small flex-grow-1 mb-3">
            {producto.descripcion
            ? producto.descripcion.substring(0, 50) + "..."
            : ""}
        </p>

        <div className="add-to-cart-widget mt-auto">
            <div className="d-flex justify-content-center align-items-center gap-2">
            <input
                type="number"
                className="form-control form-control-sm text-center"
                style={{ width: "60px" }}
                min={1}
                max={stockDisponible}
                value={cantidad}
                onChange={(e) =>
                setCantidad(
                    Math.max(
                    1,
                    Math.min(stockDisponible, Number(e.target.value))
                    )
                )
                }
                disabled={stockDisponible === 0 || isAdded}
            />
            <button
                onClick={AgregarAlCarrito}
                className={`btn d-flex align-items-center rounded-1 px-3 ${
                isAdded ? "btn-success added" : "btn-primary"
                }`}
                disabled={stockDisponible === 0 || isAdded}
            >
                {isAdded ? (
                "¡Listo!"
                ) : (
                <>
                    <i className="bi bi-cart-plus me-1"></i>
                    {stockDisponible > 0 ? "Añadir" : "Agotado"}
                </>
                )}
            </button>
            </div>

            <div className={`added-message ${isAdded ? "show" : ""}`}>
            Agregado al carrito
            </div>
        </div>
        </div>
    </div>
    </div>
);
}

export default CartaProducto;
