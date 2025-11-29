import React, { useEffect, useState } from 'react';

const FormatoPrecio = (precio) => {
    if (precio === null || precio === undefined) return "$0";
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(precio);
};
const FormatoFecha = (fechaString) => {
    if (!fechaString) return "-";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString() + ' ' + fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/ordenes")
            .then(res => res.json())
            .then(data => {
                const ordenadas = Array.isArray(data) ? data.sort((a, b) => b.id - a.id) : [];
                setOrdenes(ordenadas);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar órdenes:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-5">Cargando órdenes...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Órdenes</h2>

            {ordenes.length === 0 ? (
                <div className="alert alert-warning">No hay órdenes registradas.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID / Boleta</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenes.map(ord => (
                                <tr key={ord.id}>
                                    <td>
                                        <strong>#{ord.id}</strong><br/>
                                        <small className="text-muted">{ord.codigoBoleta}</small>
                                    </td>
                                    <td>{FormatoFecha(ord.fecha)}</td>
                                    <td>
                                        {/* Usamos ?. por si el usuario fue borrado */}
                                        {ord.usuario?.nombre || "Sin nombre"} <br />
                                        <small className="text-muted">{ord.usuario?.email}</small>
                                    </td>
                                    <td>
                                        <ul className="list-unstyled mb-0 small">
                                            {ord.detalles?.map(det => (
                                                <li key={det.id}>
                                                    {det.producto?.nombre || "Producto ID " + det.productoId} 
                                                    <strong> x {det.cantidad}</strong>
                                                    <span className="text-muted ms-2">
                                                        ({FormatoPrecio(det.precioUnitario)})
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="fw-bold text-success">
                                        {FormatoPrecio(ord.total)}
                                    </td>
                                    <td>
                                        <span className="badge bg-secondary">
                                            {ord.estado || "Pendiente"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminOrdenes;