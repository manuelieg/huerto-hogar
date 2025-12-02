import React, { useEffect, useState } from "react";

const API = "http://3.16.215.211:8080/api/ordenes";

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

function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarOrdenes = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();

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

    useEffect(() => {
        cargarOrdenes();
    }, []);

    if (loading)
        return <div className="text-center mt-5">Cargando órdenes...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Órdenes</h2>

            <div className="card p-3 mb-4">
                <h5>Listado de Órdenes</h5>

                {ordenes.length === 0 ? (
                    <div className="alert alert-warning">
                        No hay órdenes registradas.
                    </div>
                ) : (
                    <table className="table table-striped table-hover mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Boleta</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ordenes.map((ord) => (
                                <tr key={ord.id}>
                                    <td>{ord.id}</td>
                                    <td>{ord.codigoBoleta}</td>
                                    <td>{FormatoFecha(ord.fecha)}</td>
                                    <td>
                                        {ord.usuario?.nombre} {ord.usuario?.apellido}
                                        <br />
                                        <small className="text-muted">
                                            {ord.usuario?.email}
                                        </small>
                                    </td>
                                    <td>
                                        <ul className="list-unstyled mb-0 small">
                                            {ord.detalles?.map((det) => (
                                                <li key={det.id}>
                                                    {det.producto?.nombre ||
                                                        "Producto " + det.productoId}{" "}
                                                    x <strong>{det.cantidad}</strong>{" "}
                                                    <span className="text-muted ms-1">
                                                        ({FormatoPrecio(
                                                            det.precioUnitario
                                                        )}
                                                        )
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="fw-bold">
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
                )}
            </div>
        </div>
    );
}

export default AdminOrdenes;
