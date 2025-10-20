import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader.jsx";
import AdminBarra from "../components/AdminBarra.jsx";
import { productos as productosIniciales } from "../data/productos.js";
import { usuarios as usuariosIniciales } from "../data/usuarios.js";
import { ordenes } from "../data/ordenes.js"; 

function Admin({ children }) {
  const [productos, setProductos] = useState(() => {
    const guardado = localStorage.getItem("productos");
    return guardado ? JSON.parse(guardado) : productosIniciales;
  });

  const [usuarios, setUsuarios] = useState(() => {
    const guardado = localStorage.getItem("usuarios");
    return guardado ? JSON.parse(guardado) : usuariosIniciales;
  });
  
  const [ordenesState, setOrdenesState] = useState(ordenes);

  return (
    <div className="admin-container">
      <AdminHeader />
      <div className="container-fluid main-bg p-4">
        <div className="row">
          <div className="col-md-2">
            <AdminBarra />
          </div>
          <div className="col-md-10">
            {children ? (
              children
            ) : (
              <>
                <h2 className="text-title">Dashboard</h2>
                <p className="text-subtitle">Resumen de actividades</p>

                <div className="row mb-4">
                  <div className="col-md-4">
                    <div className="card card-custom text-center">
                      <div className="card-body">
                        <h5 className="card-title">Compras</h5>
                        <p className="card-text fs-3">{ordenesState.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card card-custom text-center">
                      <div className="card-body">
                        <h5 className="card-title">Productos</h5>
                        <p className="card-text fs-3">{productos.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card card-custom text-center">
                      <div className="card-body">
                        <h5 className="card-title">Usuarios</h5>
                        <p className="card-text fs-3">{usuarios.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

