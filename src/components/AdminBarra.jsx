function AdminBarra() {
  return (
    <nav className="admin-sidebar d-flex flex-column p-3">
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a href="#" className="nav-link">Dashboard</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link">Ordenes</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link">Productos</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link">Categorias</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link">Usuarios</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link">Reportes</a>
        </li>
        <li className="nav-item mt-auto">
          <a href="#" className="nav-link logout">Cerrar sesión</a>
        </li>
      </ul>
    </nav>
  );
}

export default AdminBarra;

