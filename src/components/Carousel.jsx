import React from "react";
import { Link } from "react-router-dom";

const CarouselMain = ({ imagenes }) => {
const items = imagenes || [];

if (items.length === 0) {
    return (
    <div className="text-center p-4 bg-gray-100 border rounded-lg">
        Sin contenido de carrusel disponible.
    </div>
    );
}

return (
    <div id="carouselMain" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
        {items.map((_, index) => (
        <button
            key={index}
            type="button"
            data-bs-target="#carouselMain"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
        ></button>
        ))}
    </div>

    <div className="carousel-inner">
        {items.map((imagen, index) => (
        <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
            <Link 
                to={imagen.link || "/productos"} 
                className="text-decoration-none"
                style={{ cursor: "pointer" }}
            >
                <img
                src={imagen.src}
                className="d-block w-100"
                alt={imagen.alt}
                style={{ maxHeight: "400px", objectFit: "cover", filter: "brightness(0.85)" }} 
                />

                <div className="carousel-caption d-none d-md-block">
                <h3 className="fw-bold text-white text-uppercase" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
                    {imagen.titulo}
                </h3>
                <p className="fs-5 text-white" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
                    {imagen.descripcion}
                </p>
                <div className="mt-3">
                    <span className="btn btn-warning fw-bold px-4 rounded-pill shadow-sm">
                        Ver Ofertas
                    </span>
                </div>
                </div>
            </Link>
        </div>
        ))}
    </div>

    <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselMain"
        data-bs-slide="prev"
    >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
    </button>
    <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselMain"
        data-bs-slide="next"
    >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
    </button>
    </div>
);
};

export default CarouselMain;
