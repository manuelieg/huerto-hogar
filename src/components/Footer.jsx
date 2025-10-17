import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-auto">
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase fw-bold mb-3">Enlaces Rápidos</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/productos" className="text-white text-decoration-none">Ver Productos</Link></li>
                            <li><Link to="/ofertas" className="text-white text-decoration-none">Ofertas</Link></li>
                            <li><Link to="/contacto" className="text-white text-decoration-none">Contacto</Link></li>
                        </ul>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase fw-bold mb-3">Contacto</h6>
                        <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i> Santiago, Chile</p>
                        <p className="mb-1"><i className="bi bi-envelope-fill me-2"></i> contacto@huertohogar.cl</p>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase fw-bold mb-3">Huerto Hogar</h6>
                        <p className="text-muted">Desarrollo FullStack II</p>
                    </div>
                </div>
                
                <div className="border-top pt-3">
                    <p className="mb-0 text-muted small">
                        © {new Date().getFullYear()} Huerto Hogar. Todos los derechos reservados.
                    </p>
                    <p className="mb-0 text-muted small">
                        Evaluación Parcial 2 - Integración React y Bootstrap.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
