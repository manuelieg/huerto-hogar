import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader.jsx";
import AdminBarra from "../components/AdminBarra.jsx";
import axios from "../services/AxiosConfig.js"; 

function Admin({ children }) {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const cargarDatos = async () => {
    try {
      const [resProd, resUsu, resOrd, resBlog] = await Promise.all([
        axios.get("/productos"),
        axios.get("/usuarios"),
        axios.get("/ordenes"),
        axios.get("/blogs"),
      ]);

      setProductos(resProd.data);
      setUsuarios(resUsu.data);
      setOrdenes(resOrd.data);
      setBlogs(resBlog.data);
      
    } catch (err) {
      console.error("Error cargando dashboard:", err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

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
                  <div className="col-md-3">
                    <div className="card card-custom text-center">
                      <div className="card-body">
                        <h5 className="card-title">Compras</h5>
                        <p className="card-text fs-3">{ordenes.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card card-custom text-center">
                      <div className="card-body">
                        <h5 className="card-title">Productos</h5>
                        <p className="card-text fs-3">{productos.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card card-custom text-center">
                      <div className="card-body">
                        <h5 className="card-title">Usuarios</h5>
                        <p className="card-text fs-3">{usuarios.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card card-custom text-center">
                      <div className="card-body">
                        <h5 className="card-title">Blogs</h5>
                        <p className="card-text fs-3">{blogs.length}</p>
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
