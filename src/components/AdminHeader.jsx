function AdminHeader() {
  return (
    <header className="admin-header d-flex justify-content-between align-items-center p-3">
      <h1 className="header-title">Huerto Hogar</h1>
      <div className="header-actions d-flex align-items-center">
        <span className="user-name me-3">Administrador</span>
      </div>
    </header>
  );
}

export default AdminHeader;
