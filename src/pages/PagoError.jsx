import React from "react";
import { Link, useLocation } from "react-router-dom";

const PagoError = () => {
const location = useLocation();
const mensajeError = location.state?.error || "Ocurrió un error desconocido.";

const obtenerConfiguracion = (mensaje) => {
    const texto = mensaje.toString().toLowerCase();

    if (
    texto.includes("stock") ||
    texto.includes("insuficiente") ||
    texto.includes("agotado")
    ) {
    return {
        tema: "warning",
        icono: "bi-exclamation-triangle-fill",
        titulo: "Stock Insuficiente",
        descripcion:
        "¡Ups! Alguien se llevó el último producto justo antes que tú.",
        botonPrincipalTexto: "Volver al Carrito para Editar",
        botonPrincipalLink: "/carrito",
    };
    }


    if (
    texto.includes("403") ||
    texto.includes("401") ||
    texto.includes("sesión") ||
    texto.includes("identificarte")
    ) {
    return {
        tema: "primary",
        icono: "bi-person-lock",
        titulo: "Necesitas una Cuenta",
        descripcion:
        "Por seguridad, debes iniciar sesión o registrarte para completar la compra.",
        botonPrincipalTexto: "Ir al Login",
        botonPrincipalLink: "/login",
    };
    }

    return {
    tema: "danger",
    icono: "bi-x-octagon-fill",
    titulo: "Error en el Pago",
    descripcion:
        "Lo sentimos, hubo un fallo técnico o de comunicación. No se realizó ningún cargo.",
    botonPrincipalTexto: "Intentar Pagar de Nuevo",
    botonPrincipalLink: "/checkout",
    };
};

const config = obtenerConfiguracion(mensajeError);

return (
    <div className="container mt-5 pt-5 text-center">
    <div
        className="card shadow-lg p-5 border-0"
        style={{ maxWidth: "600px", margin: "0 auto" }}
    >
        <i
        className={`bi ${config.icono} text-${config.tema} display-1 mb-3`}
        ></i>

        <h1 className={`fw-bolder text-${config.tema}`}>{config.titulo}</h1>

        <p className="lead">{config.descripcion}</p>

        <div className={`alert alert-${config.tema} mt-4 text-start`}>
        <strong>Detalle del Sistema:</strong>
        <br />
        <small>{mensajeError}</small>
        </div>

        <p className="mt-4 text-muted small">
        Tu carrito se mantiene guardado mientras solucionas esto.
        </p>

        <Link
        to={config.botonPrincipalLink}
        className={`btn btn-${config.tema} mt-3 w-100 fw-bold shadow-sm`}
        >
        {config.botonPrincipalTexto}
        </Link>

        <Link to="/carrito" className="btn btn-outline-secondary mt-2 w-100">
        Volver al Carrito
        </Link>
    </div>
    </div>
);
};

export default PagoError;
