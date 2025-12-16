import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instanciaAxios from '../services/AxiosConfig';

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

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
    }).format(precio);
};

const barajarArray = (array) => {
    const nuevoArray = [...array];
    for (let i = nuevoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
    }
    return nuevoArray;
};

function ProductosDestacados({ limit }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const endpoint = "/productos";

        instanciaAxios.get(endpoint)
            .then((res) => {
                let datos = res.data;
                
                if (datos && datos.length > 0) {
                    datos = barajarArray(datos);
                    
                    if (limit) {
                        datos = datos.slice(0, limit);
                    }
                }
                
                setProductos(datos);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error cargando productos:", err);
                setError("No se pudieron cargar los productos.");
                setLoading(false);
            });
    }, [limit]);

    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center my-5">{error}</div>;
    }

    if (productos.length === 0) {
        return <div className="text-center my-5 text-muted">No hay productos destacados disponibles.</div>;
    }

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
                                <div className="card h-100 shadow-sm border-0 product-card-hover transition-transform hover-lift">
                                    <div
                                        style={{ height: "200px", overflow: "hidden" }}
                                        className="rounded-top position-relative bg-white d-flex align-items-center justify-content-center p-3"
                                    >
                                        <img
                                            src={prod.imagen || "https://via.placeholder.com/300?text=Producto"}
                                            alt={prod.nombre}
                                            className="img-fluid"
                                            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Sin+Imagen"; }}
                                        />
                                        
                                        {prod.stock <= 5 && prod.stock > 0 && (
                                            <span className="position-absolute top-0 end-0 badge bg-warning text-dark m-2 shadow-sm">
                                                ¡Últimas unidades!
                                            </span>
                                        )}
                                    </div>

                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-bold text-truncate mb-1" title={prod.nombre}>
                                            {prod.nombre}
                                        </h5>

                                        <div className="fs-5 fw-bold text-success mb-2">
                                            {formatearPrecio(prod.precio)} <span className="fs-6 text-muted fw-normal">/ {unidad}</span>
                                        </div>

                                        <div className="mb-2">
                                            <span
                                                className={`badge border rounded-pill fw-normal px-2 ${
                                                    prod.stock > 0
                                                        ? "bg-light text-secondary border-secondary-subtle"
                                                        : "bg-danger-subtle text-danger border-danger"
                                                }`}
                                            >
                                                {prod.stock > 0 ? `Stock: ${prod.stock}` : "Agotado"}
                                            </span>
                                        </div>

                                        <p className="card-text text-muted small mb-3 flex-grow-1">
                                            {prod.descripcion
                                                ? (prod.descripcion.length > 50 ? prod.descripcion.substring(0, 50) + "..." : prod.descripcion)
                                                : "Calidad premium garantizada"}
                                        </p>

                                        <div className="mt-auto">
                                            <button className="btn btn-outline-success w-100 btn-sm rounded-pill fw-bold">
                                                <i className="bi bi-eye me-2"></i> Ver Detalle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <style>{`
                .hover-lift {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
                }
            `}</style>
        </section>
    );
}

export default ProductosDestacados;