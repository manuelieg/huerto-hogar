import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductosDestacados() {
const [productos, setProductos] = useState([]);

const barajarArray = (array) => {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
    [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
};

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

function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    }).format(precio);
}

useEffect(() => {
    fetch("http://3.16.215.211:8080/api/productos")
    .then((res) => res.json())
    .then((data) => {
        if (data.length > 0) {
        const barajados = barajarArray(data);
        setProductos(barajados.slice(0, 4));
        }
    })
    .catch((err) => console.error("Error cargando destacados:", err));
}, []);

if (productos.length === 0) return null;

return (
    <section className="container my-5">
    <div className="row g-4">
        {productos.map((prod) => {
        const unidad = obtenerUnidad(prod);

        return (
            <div key={prod.id} className="col-12 col-md-6 col-lg-3">
            <Link
                to={`/productos/${prod.id}`}
                className="text-decoration-none text-dark"
            >
                <div className="card h-100 shadow-sm border-0 product-card-hover">
                {}
                <div
                    style={{ height: "200px", overflow: "hidden" }}
                    className="rounded-top position-relative bg-white d-flex align-items-center justify-content-center"
                >
                    <img
                    src={prod.imagen || "https://via.placeholder.com/300"}
                    alt={prod.nombre}
                    className="img-fluid"
                    style={{ maxHeight: "100%", objectFit: "contain" }}
                    />
                </div>

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-truncate mb-1">
                    {prod.nombre}
                    </h5>

                    <div className="fs-5 fw-bold text-success mb-1">
                    {formatearPrecio(prod.precio)} / {unidad}
                    </div>


                    <div className="mb-3">
                    <small
                        className={`badge border rounded-pill fw-normal px-2 ${
                        prod.stock > 0
                            ? "bg-light text-secondary border-secondary-subtle"
                            : "bg-danger-subtle text-danger border-danger"
                        }`}
                    >
                        Stock: {prod.stock} {unidad}
                    </small>
                    </div>

                    <p className="card-text text-muted small mb-3">
                    {prod.descripcion
                        ? prod.descripcion.substring(0, 40) + "..."
                        : "Calidad premium garantizada"}
                    </p>

                    <div className="mt-auto">
                    <button className="btn btn-outline-success w-100 btn-sm rounded-pill">
                        <i className="bi bi-cart-plus me-2"></i> Ver Detalle
                    </button>
                    </div>
                </div>
                </div>
            </Link>
            </div>
        );
        })}
    </div>
    </section>
);
}

export default ProductosDestacados;
