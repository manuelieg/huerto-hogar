import React from "react";
import { Link } from "react-router-dom";

const PagoError = () => {
return (
    <div className="container mt-5 pt-5 text-center">
    <div
        className="card shadow-lg p-5 border-0"
        style={{ maxWidth: "600px", margin: "0 auto" }}
    >
        <i className="bi bi-x-octagon-fill text-danger display-1 mb-3"></i>
        <h1 className="fw-bolder text-danger">Error en el Pago</h1>
        <p className="lead">Lo sentimos, no pudimos procesar tu transacción.</p>

        <div className="alert alert-warning mt-4">
        <strong>Problema Detectado:</strong> Fondos insuficientes o fallo de
        comunicación con el banco. Inténtalo de nuevo.
        </div>

        <p className="mt-4">Tu carrito se ha mantenido intacto.</p>

        <Link to="/checkout" className="btn btn-primary mt-3 w-100">
        Intentar Pagar de Nuevo
        </Link>
        <Link to="/carrito" className="btn btn-outline-secondary mt-2 w-100">
        Volver al Carrito
        </Link>
    </div>
    </div>
);
};

export default PagoError;
