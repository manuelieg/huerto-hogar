import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

function PagoExito() {
const location = useLocation();
const { orden } = location.state || {};

if (!orden) {
    return <Navigate to="/" replace />;
}

const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    }).format(precio);
};

return (
    <div className="container my-5 text-center">
    <div className="card shadow-lg border-0 p-5 mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-4 text-success">
        <i className="bi bi-check-circle-fill display-1"></i>
        </div>
        
        <h1 className="fw-bold text-success mb-3">¡Pago Exitoso!</h1>
        <p className="lead text-muted">
        Gracias por tu compra. Tu pedido ha sido procesado correctamente.
        </p>

        <div className="alert alert-light border mt-4 text-start">
        <h5 className="border-bottom pb-2 mb-3 fw-bold">
            <i className="bi bi-receipt me-2"></i>Detalle de la Boleta
        </h5>
        
        <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">N° Orden:</span>
            <span className="fw-bold font-monospace">{orden.codigoBoleta}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Fecha:</span>
            <span>{new Date(orden.fecha).toLocaleDateString()}</span>
        </div>

        <table className="table table-sm table-borderless">
            <thead>
            <tr className="border-bottom">
                <th>Producto</th>
                <th className="text-center">Cant.</th>
                <th className="text-end">Total</th>
            </tr>
            </thead>
            <tbody>
            {orden.detalles?.map((detalle) => (
                <tr key={detalle.id}>
                <td>{detalle.producto.nombre}</td>
                <td className="text-center">{detalle.cantidad}</td>
                  <td className="text-end">{formatearPrecio(detalle.precioUnitario * detalle.cantidad)}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <div className="d-flex justify-content-between border-top pt-2 mt-2">
            <span className="fw-bold fs-5">Total Pagado:</span>
            <span className="fw-bold fs-5 text-success">{formatearPrecio(orden.total)}</span>
        </div>
        </div>

        <div className="mt-4">
        <Link to="/productos" className="btn btn-primary btn-lg px-5">
            Seguir Comprando
        </Link>
        </div>
    </div>
    </div>
);
}

export default PagoExito;