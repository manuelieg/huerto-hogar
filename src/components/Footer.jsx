import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-main py-5 mt-auto bg-dark text-white">
            <div className="container">
                <div className="row text-start">

                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase fw-bold mb-3">Enlaces Rápidos</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/productos" className="text-white text-decoration-none">Ver Productos</Link></li>
                            <li><Link to="/nosotros" className="text-white text-decoration-none">Nosotros</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase fw-bold mb-3">Contacto</h6>
                        <p className="mb-1">Santiago, Chile</p>
                        <p className="mb-1">contacto@huertohogar.cl</p>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h6 className="text-uppercase fw-bold mb-3">Tienda HuertoHogar</h6>
                        <p className="mb-0">©2025 HuertoHogar. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


