import React from 'react';
import { Link } from 'react-router-dom';

const PagoExito = () => {
    const orderId = 'ORD-' + Math.floor(Math.random() * 90000) + 10000;
    
    return (
        <div className="container mt-5 pt-5 text-center">
            <div className="card shadow-lg p-5 border-0" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
                <h1 className="fw-bolder text-success">¡Pago Confirmado!</h1>
                <p className="lead">Tu orden ha sido procesada correctamente.</p>
                
                <div className="alert alert-success mt-4">
                    <strong>Número de Orden:</strong> {orderId}
                </div>

                <p className="mt-4">
                    Recibirás un correo electrónico de confirmación con los detalles de tu compra.
                </p>
                
                <Link to="/" className="btn btn-primary mt-3 w-100">Volver al Inicio</Link>
                <Link to="/productos" className="btn btn-outline-secondary mt-2 w-100">Seguir Comprando</Link>
            </div>
        </div>
    );
};

export default PagoExito;