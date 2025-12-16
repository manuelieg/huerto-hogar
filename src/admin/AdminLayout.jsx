import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usarAutenticacion } from "../context/GestionAutenticacion";
import "../components/Admin.css";

const AdminLayout = ({ children }) => {
const location = useLocation();
const navigate = useNavigate();
const { cerrarSesion } = usarAutenticacion();

const isActive = (path) => location.pathname === path ? "active bg-primary" : "text-white";

const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
};

return (
    <div className="d-flex min-vh-100">
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "260px" }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <i className="bi bi-shield-lock-fill fs-4 me-2"></i>
        <span className="fs-5 fw-bold">Huerto Admin</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-1">
            <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active bg-primary' : 'text-white'}`}>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
        </li>
        <li className="nav-item mb-1">
            <Link to="/admin/ordenes" className={`nav-link ${isActive('/admin/ordenes')}`}>
            <i className="bi bi-cart-check me-2"></i> Órdenes
            </Link>
        </li>
        <li className="nav-item mb-1">
            <Link to="/admin/productos" className={`nav-link ${isActive('/admin/productos')}`}>
            <i className="bi bi-box-seam me-2"></i> Productos
            </Link>
        </li>
        <li className="nav-item mb-1">
            <Link to="/admin/categorias" className={`nav-link ${isActive('/admin/categorias')}`}>
            <i className="bi bi-tags me-2"></i> Categorías
            </Link>
        </li>
        <li className="nav-item mb-1">
            <Link to="/admin/usuarios" className={`nav-link ${isActive('/admin/usuarios')}`}>
            <i className="bi bi-people me-2"></i> Usuarios
            </Link>
        </li>
        <li className="nav-item mb-1">
            <Link to="/admin/contactos" className={`nav-link ${isActive('/admin/contactos')}`}>
            <i className="bi bi-envelope me-2"></i> Mensajes
            </Link>
        </li>
        <li className="nav-item mb-1">
            <Link to="/admin/blogs" className={`nav-link ${isActive('/admin/blogs')}`}>
            <i className="bi bi-journal-text me-2"></i> Blogs
            </Link>
        </li>
        </ul>
        <hr />
        <div className="dropdown">
        <button onClick={handleLogout} className="btn btn-outline-light w-100 text-start btn-sm">
            <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
        </button>
        <Link to="/" className="btn btn-link text-white-50 text-decoration-none btn-sm mt-2">
            <i className="bi bi-arrow-return-left me-1"></i> Ir a la Tienda
        </Link>
        </div>
    </div>

    <div className="flex-grow-1 admin-background d-flex flex-column" style={{ maxHeight: "100vh", overflowY: "auto" }}>
        <div className="container-fluid p-4">
            {children}
        </div>
    </div>
    </div>
);
};

export default AdminLayout;