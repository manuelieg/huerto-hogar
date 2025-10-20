import React from 'react';
import { ordenes, getAllOrders } from '../data/ordenes.js';
import { productos } from '../data/productos.js';

const FormatoPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(precio);
};

function AdminOrdenes() {
    const todasLasOrdenes = getAllOrders();

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Órdenes</h2>

            {todasLasOrdenes.length === 0 
                ? <p>No hay órdenes registradas.</p>
                : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID Orden</th>
                                <th>Cliente</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todasLasOrdenes.map(ord => (
                                <tr key={ord.id}>
                                    <td>{ord.id}</td>
                                    <td>{ord.cliente.nombre} {ord.cliente.apellidos}<br/><small>{ord.cliente.correo}</small></td>
                                    <td>
                                        <ul className="mb-0">
                                            {ord.items.map(item => {
                                                const prod = productos.find(p => p.id === item.id);
                                                return <li key={item.id}>{prod?.nombre || item.id} x {item.cantidad}</li>;
                                            })}
                                        </ul>
                                    </td>
                                    <td>{FormatoPrecio(ord.total)}</td>
                                    <td>{ord.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    );
}

export default AdminOrdenes;