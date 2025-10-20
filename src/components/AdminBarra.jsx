import React from 'react';
import { usarAutenticacion } from "../context/GestionAutenticacion.jsx";
import { useNavigate, Link } from "react-router-dom";

function AdminBarra() {
    const { cerrarSesion } = usarAutenticacion();
    const navegar = useNavigate();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navegar("/login");
    };

    return (
        <nav className="admin-sidebar d-flex flex-column p-3">
            <h5 className="text-warning fw-bolder mb-4">Huerto Admin</h5>
            <ul className="nav flex-column flex-grow-1">
                <li className="nav-item mb-2">
                    <Link to="/admin" className="nav-link">
                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/admin/ordenes" className="nav-link">
                        <i className="bi bi-box-seam me-2"></i> Órdenes
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/admin/productos" className="nav-link">
                        <i className="bi bi-box-seam me-2"></i> Productos
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/admin/categorias" className="nav-link">
                        <i className="bi bi-tags-fill me-2"></i> Categorías
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/admin/usuarios" className="nav-link">
                        <i className="bi bi-people-fill me-2"></i> Usuarios
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/admin/reportes" className="nav-link">
                        <i className="bi bi-bar-chart-line-fill me-2"></i> Reportes
                    </Link>
                </li>
                <li className="nav-item mt-auto pt-3 border-top">
                    <button
                        onClick={manejarCerrarSesion}
                        className="btn btn-link nav-link text-warning fw-bold"
                        style={{ padding: 0 }}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default AdminBarra;


