import React, { useEffect, useState } from "react";
import OrdenService from "../services/OrdenService"; 

const FormatoPrecio = (precio) => {
if (!precio) return "$0";
return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
}).format(precio);
};

const FormatoFecha = (fechaString) => {
if (!fechaString) return "-";
const fecha = new Date(fechaString);
return (
    fecha.toLocaleDateString() +
    " " +
    fecha.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
);
};

const StatusBadge = ({ estado }) => {
    let colorClass = "bg-secondary";
    if (estado === "PENDIENTE") colorClass = "bg-warning text-dark";
    if (estado === "PAGADO") colorClass = "bg-info text-dark";
    if (estado === "ENVIADO") colorClass = "bg-primary";
    if (estado === "ENTREGADO") colorClass = "bg-success";
    if (estado === "CANCELADO") colorClass = "bg-danger";

    return (
        <span className={`badge ${colorClass} rounded-pill`}>
            {estado}
        </span>
    );
};

function AdminOrdenes() {
const [ordenes, setOrdenes] = useState([]);
const [loading, setLoading] = useState(true);

const cargarOrdenes = async () => {
    setLoading(true);
    try {
    const res = await OrdenService.obtenerTodasLasOrdenes();
    const data = res.data;
    const ordenadas = Array.isArray(data)
        ? data.sort((a, b) => b.id - a.id)
        : [];
    setOrdenes(ordenadas);
    } catch (err) {
    console.error("Error al cargar órdenes:", err);
    } finally {
    setLoading(false);
    }
};

const manejarCambioEstado = async (id, nuevoEstado) => {
    if (!window.confirm(`¿Cambiar orden #${id} a estado: ${nuevoEstado}?`)) return;

    try {
    await OrdenService.actualizarEstado(id, nuevoEstado);
    setOrdenes((prev) =>
        prev.map((o) => (o.id === id ? { ...o, estado: nuevoEstado } : o))
    );
    } catch (error) {
    console.error("Error al actualizar:", error);
    alert("No se pudo actualizar el estado.");
    }
};

useEffect(() => {
    cargarOrdenes();
}, []);

return (
    <div className="container mt-5 mb-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark"> Administración de Órdenes</h2>
        <button className="btn btn-outline-primary btn-sm" onClick={cargarOrdenes}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise me-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            Refrescar
        </button>
    </div>

    <div className="card shadow border-0">
        <div className="card-body p-0">
        {loading ? (
            <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Cargando pedidos...</p>
            </div>
        ) : ordenes.length === 0 ? (
            <div className="alert alert-info m-4 text-center">
            No hay órdenes registradas en el sistema.
            </div>
        ) : (
            <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-secondary">
                <tr>
                    <th scope="col" className="ps-4">ID</th>
                    <th scope="col">Fecha / Boleta</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Detalle Productos</th>
                    <th scope="col">Total</th>
                    <th scope="col">Estado</th>
                    <th scope="col" className="text-end pe-4">Acción</th>
                </tr>
                </thead>
                <tbody>
                {ordenes.map((ord) => (
                    <tr key={ord.id}>
                    <td className="ps-4 fw-bold text-primary">#{ord.id}</td>
                    <td>
                        <div className="fw-bold text-dark">{FormatoFecha(ord.fecha)}</div>
                        <small className="text-muted font-monospace">{ord.codigoBoleta}</small>
                    </td>
                    <td>
                        <div className="fw-bold">{ord.usuario?.nombre} {ord.usuario?.apellido}</div>
                        <small className="text-muted">{ord.usuario?.email}</small>
                    </td>
                    <td>
                        <ul className="list-unstyled mb-0 small">
                        {ord.detalles?.map((det, index) => (
                            <li key={index} className="mb-1 text-nowrap">
                            <span className="badge bg-light text-dark border me-1">
                                x{det.cantidad}
                            </span>
                            {det.producto?.nombre || `Prod ID ${det.productoId}`}
                            </li>
                        ))}
                        </ul>
                    </td>
                    <td className="fw-bold text-success fs-6">
                        {FormatoPrecio(ord.total)}
                    </td>
                    <td>
                        <StatusBadge estado={ord.estado} />
                    </td>
                    <td className="text-end pe-4">
                        <select
                        className="form-select form-select-sm d-inline-block border-primary text-primary fw-bold"
                        style={{ width: "140px", cursor: "pointer" }}
                        value={ord.estado || "PENDIENTE"}
                        onChange={(e) => manejarCambioEstado(ord.id, e.target.value)}
                        >
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="PAGADO">Pagado</option>
                        <option value="ENVIADO">Enviado</option>
                        <option value="ENTREGADO">Entregado</option>
                        <option value="CANCELADO">Cancelado</option>
                        </select>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    </div>
    </div>
);
}

export default AdminOrdenes;
