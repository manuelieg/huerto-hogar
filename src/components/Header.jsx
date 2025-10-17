import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="shadow-sm"> 
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
                <div className="container-fluid">
                    
                    <Link to="/" className="navbar-brand fs-4 fw-bold d-lg-none">
                        Huerto Hogar
                    </Link>

                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navLinks" 
                        aria-controls="navLinks" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navLinks">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/productos" className="nav-link">Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/blog" className="nav-link">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contacto" className="nav-link">Contacto</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/categorias" className="nav-link">Categorías</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/ofertas" className="nav-link">Ofertas</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div className="container-fluid">
                    
                    <Link to="/" className="navbar-brand fs-4 fw-bold text-dark me-5 d-none d-lg-block">
                        Huerto Hogar
                    </Link>

                    <form className="d-flex mx-auto" role="search" style={{ maxWidth: '400px' }}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Buscar productos..." 
                            aria-label="Buscar" 
                        />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>

                    <div className="d-flex align-items-center">
                        <Link to="/carrito" className="btn btn-sm btn-success me-3 shadow-sm">
                            <i className="bi bi-cart-fill me-1"></i> Carrito $5.000
                        </Link>
                        <Link to="/login" className="btn btn-sm btn-outline-primary me-2">
                            Iniciar Sesión
                        </Link>
                        <Link to="/registro" className="btn btn-sm btn-warning d-none d-lg-block">
                            Crear Cuenta
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
