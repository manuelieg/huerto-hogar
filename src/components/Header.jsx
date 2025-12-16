import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { usarCarrito } from "../context/GestionCarrito.jsx";
import { usarAutenticacion } from "../context/GestionAutenticacion.jsx";

const Header = ({ cartCount = 0 }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  
  const [categoriasBackend, setCategoriasBackend] = useState([]);

  const navigate = useNavigate();
  const { productosTienda } = usarCarrito(); 
  const { usuario, estaAutenticado, cerrarSesion } = usarAutenticacion();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const respuesta = await axios.get("/categorias");
        const datosSeguros = Array.isArray(respuesta.data) ? respuesta.data : [];
        setCategoriasBackend(datosSeguros);
      } catch (error) {
        console.error("Error al cargar categorías:", error.response || error.message);
        setCategoriasBackend([]);
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

  const normalizarTexto = (texto) => {
    return texto
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const alEscribir = (e) => {
    const texto = e.target.value;
    setBusqueda(texto);

    if (!texto.trim()) {
      setResultados([]);
      return;
    }

    const textoNormalizado = normalizarTexto(texto);

    const coincidentes = productosTienda.filter((p) => {
      const nombreNorm = normalizarTexto(p.nombre);
      return nombreNorm.includes(textoNormalizado);
    });

    setResultados(coincidentes);
  };

  const irAlProducto = (id) => {
    navigate(`/productos/${id}`);
    setBusqueda("");
    setResultados([]);
  };

  const manejarBusquedaSubmit = (e) => {
    e.preventDefault();
    if (resultados.length > 0) {
      irAlProducto(resultados[0].id);
    } else {
      const textoBuscado = normalizarTexto(busqueda.trim());
      const encontrado = productosTienda.find(p => normalizarTexto(p.nombre).includes(textoBuscado));
      if(encontrado) irAlProducto(encontrado.id);
    }
  };

  const manejarCerrarSesion = () => {
    cerrarSesion();
    setUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="shadow-sm" style={{ position: 'relative', zIndex: 1050 }}>
      <div className="navbar navbar-expand-lg navbar-light navbar-top border-bottom">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-4 fw-bold text-dark me-5">
            HuertoHogar
          </Link>

          <form
            className="d-flex mx-auto position-relative"
            role="search"
            style={{ maxWidth: "400px", width: "100%" }}
            onSubmit={manejarBusquedaSubmit}
>
            <div className="w-100">
                <input
                className="form-control me-2 rounded-1"
                type="search"
                placeholder="Buscar..."
                value={busqueda}
                onChange={alEscribir}
                autoComplete="off"
                />
                
                {resultados.length > 0 && (
                    <div className="list-group position-absolute w-100 shadow mt-1" style={{ zIndex: 2000 }}>
                        {resultados.slice(0, 5).map((prod) => (
                            <button
                                key={prod.id}
                                type="button"
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                onClick={() => irAlProducto(prod.id)}
                            >
                                <span>{prod.nombre}</span>
                                <small className="text-muted">${prod.precio}</small>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <button className="btn btn-dark rounded-1 ms-2" type="submit">
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
                  <span className="fw-bold">
                    Hola, {usuario?.nombre ? usuario.nombre.split(" ")[0] : "Usuario"}
                  </span>
                </button>
                

                <ul className={`dropdown-menu dropdown-menu-end${userDropdownOpen ? " show" : ""}`}>
                  <li>
                    <span className="dropdown-item-text text-muted small">
                      {usuario.email}
                    </span>
                  </li>
                                  <li>
                    <Link className="dropdown-item" to="/mis-compras">
                    <i className="bi bi-bag-check me-2"></i> Mis Pedidos
                    </Link>
                </li>
                  <li><hr className="dropdown-divider" /></li>
                  
                  {(usuario.rol === 'ADMIN' || usuario.rol === 'ROLE_ADMIN') && (
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
                  type="button"
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