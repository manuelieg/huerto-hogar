import { useAuth } from "../context/AuthManager";
import { useNavigate, Link } from "react-router-dom";

function AdminBarra() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <nav className="admin-sidebar d-flex flex-column p-3">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin" className="nav-link" style={{ color: "black" }}>Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/ordenes" className="nav-link" style={{ color: "black" }}>Órdenes</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/productos" className="nav-link" style={{ color: "black" }}>Productos</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/categorias" className="nav-link" style={{ color: "black" }}>Categorías</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/usuarios" className="nav-link" style={{ color: "black" }}>Usuarios</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/reportes" className="nav-link" style={{ color: "black" }}>Reportes</Link>
        </li>
        <li className="nav-item mt-auto">
          <button
            onClick={handleLogoutClick}
            className="btn btn-link nav-link logout"
            style={{ color: "black", padding: 0 }}
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default AdminBarra;


