import React, { useState, useEffect } from "react";
import OrdenService from "../services/OrdenService";
import { usarAutenticacion } from "../context/GestionAutenticacion";
import { Link } from "react-router-dom";

const MisCompras = () => {
const { usuario } = usarAutenticacion();
const [ordenes, setOrdenes] = useState([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    if (usuario && usuario.id) {
    cargarOrdenes();
    }
}, [usuario]);

const cargarOrdenes = async () => {
    try {
    const respuesta = await OrdenService.obtenerMisOrdenes(usuario.id);
    const ordenesOrdenadas = respuesta.data.sort((a, b) => b.id - a.id);
    setOrdenes(ordenesOrdenadas);
    } catch (err) {
    console.error("Error al cargar historial:", err);
    setError("No pudimos cargar tu historial de compras.");
    } finally {
    setCargando(false);
    }
};

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    }).format(precio);
};

const getBadgeEstado = (estado) => {
    const status = estado ? estado.toUpperCase() : "PENDIENTE";

    let color = "bg-secondary";
    let icono = "bi-hourglass-split";

    if (status === "PENDIENTE") {
    color = "bg-warning text-dark";
    icono = "bi-clock";
    } else if (status === "PAGADO") {
    color = "bg-info text-dark";
    icono = "bi-cash-coin";
    } else if (status === "ENVIADO" || status === "EN_CAMINO") {
    color = "bg-primary";
    icono = "bi-truck";
    } else if (status === "ENTREGADO" || status === "COMPLETADO") {
    color = "bg-success";
    icono = "bi-check-circle";
    } else if (status === "CANCELADO") {
    color = "bg-danger";
    icono = "bi-x-circle";
    }

    return (
    <span className={`badge ${color} rounded-pill`}>
        <i className={`bi ${icono} me-1`}></i> {status}
    </span>
    );
};

if (cargando)
    return (
    <div className="text-center mt-5">
        <div className="spinner-border text-success"></div>
        <p>Cargando historial...</p>
    </div>
    );

return (
    <div className="container my-5">
    <h2 className="mb-4 fw-bold">
        <i className="bi bi-bag-check-fill text-success me-2"></i>Mis Pedidos
    </h2>

    {error && <div className="alert alert-danger">{error}</div>}

    {ordenes.length === 0 ? (
        <div className="card shadow-sm p-5 text-center">
        <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
        <h3>Aún no has realizado compras</h3>
        <p className="text-muted">¡Es un buen momento para llenar tu huerto!</p>
        <Link to="/productos" className="btn btn-success mt-3">
            Ir a la Tienda
        </Link>
        </div>
    ) : (
        <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
            <tr>
                <th>N° Boleta</th>
                <th>Estado</th>
                <th>Fecha (ID)</th>
                <th>Total</th>
                <th>Detalle</th>
            </tr>
            </thead>
            <tbody>
            {ordenes.map((orden) => (
                <tr key={orden.id}>
                <td className="fw-bold text-primary">
                    {orden.codigoBoleta || "PENDIENTE"}
                </td>

                <td>{getBadgeEstado(orden.estado)}</td>

                <td>Orden #{orden.id}</td>
                <td className="fw-bold text-success">
                    {formatearPrecio(orden.total)}
                </td>
                <td>
                    <button
                    className="btn btn-sm btn-outline-dark"
                    data-bs-toggle="collapse"
                    data-bs-target={`#detalle-${orden.id}`}
                    >
                    Ver Productos <i className="bi bi-chevron-down ms-1"></i>
                    </button>

                    <div className="collapse mt-2" id={`detalle-${orden.id}`}>
                    <ul className="list-group list-group-flush small">
                        {orden.detalles &&
                        orden.detalles.map((d, index) => {
                            const unidad = d.producto?.unidadMedida || "UNIDAD";
                            const etiquetaUnidad = unidad === "KG" ? "kg" : "unidades";
                            
                            const subtotalItem = Math.round(d.precioUnitario * d.cantidad);

                            return (
                            <li
                                key={index}
                                className="list-group-item bg-light d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <span className="fw-bold">
                                        {d.producto ? d.producto.nombre : "Producto eliminado"}
                                    </span>
                                    <span className="text-muted ms-2">
                                        (x {d.cantidad} {etiquetaUnidad})
                                    </span>
                                </div>
                                
                                <span className="fw-semibold">
                                    {formatearPrecio(subtotalItem)}
                                </span>
                            </li>
                            );
                        })}
                    </ul>
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )}
    </div>
);
};

export default MisCompras;