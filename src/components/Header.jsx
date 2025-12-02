import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { usarCarrito } from "../context/GestionCarrito.jsx";
import { usarAutenticacion } from "../context/GestionAutenticacion.jsx";

const Header = ({ cartCount = 0 }) => {
const [dropdownOpen, setDropdownOpen] = useState(false);
const [userDropdownOpen, setUserDropdownOpen] = useState(false);
const [busqueda, setBusqueda] = useState("");
const [categoriasBackend, setCategoriasBackend] = useState([]);

const navigate = useNavigate();
const { productosTienda } = usarCarrito(); 
const { usuario, estaAutenticado, cerrarSesion } = usarAutenticacion();

useEffect(() => {
    const obtenerCategorias = async () => {
    try {
        const respuesta = await axios.get("http://18.217.238.198:8080./api/categorias");
        setCategoriasBackend(respuesta.data);
    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
    };
    obtenerCategorias();
}, []);

const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

const getCartText = (count) => {
    if (count === 0) return "Carrito (Vacío)";
    return `Carrito (${count} ítem${count !== 1 ? "s" : ""})`;
};

const manejarBusqueda = (e) => {
    e.preventDefault();
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return;

    const productoEncontrado = productosTienda.find(
    (p) => 
        String(p.id).toLowerCase() === texto || 
        p.nombre.toLowerCase().includes(texto)
    );

    if (productoEncontrado) {
    navigate(`/productos/${productoEncontrado.id}`);
    } else {
    alert("No se encontró ningún producto con ese nombre. Inténtelo nuevamente.");
    }

    setBusqueda("");
};

const manejarCerrarSesion = () => {
    cerrarSesion();
    setUserDropdownOpen(false);
    navigate("/");
};

return (
    <header className="shadow-sm">
    <div className="navbar navbar-expand-lg navbar-light navbar-top border-bottom">
        <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-4 fw-bold text-dark me-5">
            HuertoHogar
        </Link>

        <form
            className="d-flex mx-auto"
            role="search"
            style={{ maxWidth: "400px" }}
            onSubmit={manejarBusqueda}
        >
            <input
            className="form-control me-2 rounded-1"
            type="search"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-dark rounded-1" type="submit">
            Buscar
            </button>
        </form>

        <div className="d-flex align-items-center">
            <Link
            to="/carrito"
            className="btn btn-sm btn-success me-3 shadow-sm rounded-1 fw-bold"
            >
            <i className="bi bi-cart-fill me-1"></i> {getCartText(cartCount)}
            </Link>

            {estaAutenticado && usuario ? (
            <div className="dropdown">
                <button
                className="btn btn-sm btn-outline-dark dropdown-toggle d-flex align-items-center gap-2 rounded-1"
                type="button"
                onClick={toggleUserDropdown}
                >
                <i className="bi bi-person-circle"></i>
                <span className="fw-bold">Hola, {usuario.nombre.split(" ")[0]}</span>
                </button>
                
                <ul className={`dropdown-menu dropdown-menu-end${userDropdownOpen ? " show" : ""}`}>
                <li>
                    <span className="dropdown-item-text text-muted small">
                    {usuario.email}
                    </span>
                </li>
                <li><hr className="dropdown-divider" /></li>
                
                {usuario.rol === 'ADMIN' && (
                    <li><Link className="dropdown-item" to="/admin">Panel Admin</Link></li>
                )}
                
                <li>
                    <button 
                    className="dropdown-item text-danger" 
                    onClick={manejarCerrarSesion}
                    >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                    </button>
                </li>
                </ul>
            </div>
            ) : (
            <>
                <Link
                to="/login"
                className="btn btn-sm btn-outline-primary me-2 rounded-1"
                >
                Iniciar Sesión
                </Link>
                <Link
                to="/registro"
                className="btn btn-sm btn-warning d-none d-lg-block rounded-1"
                >
                Crear Cuenta
                </Link>
            </>
            )}
        </div>
        </div>
    </div>

    <nav className="navbar navbar-expand-lg navbar-dark navbar-bottom">
        <div className="container-fluid justify-content-center">
        <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
            </li>

            <li 
            className="nav-item dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            >
            <span
                className="nav-link dropdown-toggle"
                role="button"
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
            >
                Categorías
            </span>

            <ul className={`dropdown-menu${dropdownOpen ? " show" : ""}`}>
                {categoriasBackend.length > 0 ? (
                categoriasBackend.map((cat) => (
                    <li key={cat.id}>
                    <Link
                        className="dropdown-item"
                        to={`/productos?categoria=${cat.id}`}
                        onClick={() => setDropdownOpen(false)}
                    >
                        {cat.nombre}
                    </Link>
                    </li>
                ))
                ) : (
                <li><span className="dropdown-item text-muted">Cargando...</span></li>
                )}
            </ul>
            </li>

            <li className="nav-item">
            <Link to="/productos" className="nav-link">Productos</Link>
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
