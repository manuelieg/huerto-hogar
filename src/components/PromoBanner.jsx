import React from "react";
import { Link } from "react-router-dom";

function PromoBanner() {
return (
    <section className="container-fluid py-5 my-5 bg-dark text-white position-relative overflow-hidden">
    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ opacity: 0.3 }}>
        <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop" 
            alt="Fondo" 
            className="w-100 h-100 object-fit-cover"
        />
    </div>

    <div className="container position-relative z-1 py-5">
        <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
            <h2 className="display-4 fw-bold text-warning">¡Oferta de Temporada!</h2>
            <p className="lead">Lleva la <strong>Canasta Familiar Premium</strong> con un 20% de descuento esta semana.</p>
            <ul className="list-unstyled mb-4">
            <li>✅ Frutas de estación seleccionadas</li>
            <li>✅ Verduras orgánicas certificadas</li>
            <li>✅ Despacho gratis incluido</li>
            </ul>
            <Link to="/productos" className="btn btn-light btn-lg rounded-pill fw-bold text-dark px-5">
            ¡La quiero!
            </Link>
        </div>
        <div className="col-lg-6 text-center">
            <img 
                src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=1965&auto=format&fit=crop"
                alt="Canasta Familiar" 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: "400px", filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))" }}
            />
        </div>
        </div>
    </div>
    </section>
);
}

export default PromoBanner;