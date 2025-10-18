import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="shadow-sm">

      {/* Barra superior: Logo, buscador y botones */}
      <div className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-4 fw-bold text-dark me-5">
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

      {/* Barra inferior: Links de navegación */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className="nav-link">Productos</Link>
            </li>
            <li className="nav-item">
              <Link to="/ofertas" className="nav-link">Ofertas</Link>
            </li>
            <li className="nav-item">
              <Link to="/nosotros" className="nav-link">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">Contacto</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
