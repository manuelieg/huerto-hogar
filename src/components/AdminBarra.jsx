import { Link } from "react-router-dom";

function AdminBarra() {
  return (
    <nav className="admin-sidebar d-flex flex-column p-3">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin" className="nav-link" style={{ color: "black", margin: "5px 0" }}>Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/ordenes" className="nav-link" style={{ color: "black", margin: "5px 0" }}>Órdenes</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/productos" className="nav-link" style={{ color: "black", margin: "5px 0" }}>Productos</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/categorias" className="nav-link" style={{ color: "black", margin: "5px 0" }}>Categorías</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/usuarios" className="nav-link" style={{ color: "black", margin: "5px 0" }}>Usuarios</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/admin/reportes" className="nav-link" style={{ color: "black", margin: "5px 0" }}>Reportes</Link>
        </li>
        <li className="nav-item mt-auto">
          <Link to="/logout" className="nav-link logout" style={{ color: "black", margin: "5px 0" }}>Cerrar sesión</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminBarra;

