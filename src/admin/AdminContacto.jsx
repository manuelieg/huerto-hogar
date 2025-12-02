import React, { useState, useEffect } from 'react';

const API = "http://18.217.238.198:8080./api/contactos";


function ListadoMensajes({ listaMensajes, marcarComoVisto, eliminarMensaje }) {
    return (
        <div className="card mb-4 p-3">
            <h5>Buzón de Mensajes</h5>
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Asunto</th>
                            <th>Mensaje</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaMensajes.map((msg) => (
                            <tr key={msg.id}>
                                <td>{msg.id}</td>
                                <td>{msg.fecha ? new Date(msg.fecha).toLocaleDateString() : 'Hoy'}</td>
                                <td>
                                    <strong>{msg.nombre}</strong><br />
                                    <small className="text-muted">{msg.email}</small>
                                </td>
                                <td>{msg.asunto}</td>
                                <td>
                                    <span title={msg.mensaje}>
                                        {msg.mensaje.length > 50 ? msg.mensaje.substring(0, 50) + '...' : msg.mensaje}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${msg.estado === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                        {msg.estado}
                                    </span>
                                </td>
                                <td>
                                    {msg.estado === 'PENDIENTE' && (
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() => marcarComoVisto(msg.id)}
                                            title="Marcar como revisado"
                                        >
                                            <i className="bi bi-check-lg"></i> Visto
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarMensaje(msg.id)}
                                        title="Eliminar mensaje"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {listaMensajes.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center text-muted py-3">
                                    No hay mensajes registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AdminMensajes() {
    const [listaMensajes, setListaMensajes] = useState([]);

    useEffect(() => {
        cargarMensajes();
    }, []);

    const cargarMensajes = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setListaMensajes(data);
        } catch (err) {
            console.error("Error cargando mensajes", err);
        }
    };

    const marcarComoVisto = async (id) => {
        try {
            const res = await fetch(`${API}/${id}/revisado`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                const actualizado = await res.json();
                setListaMensajes((prev) =>
                    prev.map((msg) => (msg.id === id ? actualizado : msg))
                );
            }
        } catch (err) {
            console.error("Error al actualizar", err);
        }
    };

    const eliminarMensaje = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este mensaje?")) return;

        try {
            await fetch(`${API}/${id}`, { method: "DELETE" });
            setListaMensajes((prev) => prev.filter((msg) => msg.id !== id));
        } catch (err) {
            console.error("Error al eliminar", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Contactos</h2>

            <ListadoMensajes
                listaMensajes={listaMensajes}
                marcarComoVisto={marcarComoVisto}
                eliminarMensaje={eliminarMensaje}
            />
        </div>
    );
}

export default AdminMensajes;