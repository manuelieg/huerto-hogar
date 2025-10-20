import React from 'react';

function AdminHeader() {
    return (
        <header className="admin-header d-flex justify-content-between align-items-center p-3 bg-white border-bottom shadow-sm">
            <h1 className="header-title fs-5 fw-bolder text-dark">Panel de Control</h1>
            <div className="header-actions d-flex align-items-center">
                <span className="user-name me-3 text-muted">Bienvenido, Administrador</span>
            </div>
        </header>
    );
}

export default AdminHeader;
