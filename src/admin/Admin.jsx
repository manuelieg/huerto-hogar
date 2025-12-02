import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader.jsx";
import AdminBarra from "../components/AdminBarra.jsx";

const API_PRODUCTOS = "http://3.16.215.211:8080./api/productos";
const API_USUARIOS = "http://3.16.215.211:8080./api/usuarios";
const API_ORDENES = "http://3.16.215.211:8080./api/ordenes";
const API_BLOGS = "http://3.16.215.211:8080./api/blogs";

function Admin({ children }) {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const cargarDatos = async () => {
    try {
      const [resProd, resUsu, resOrd, resBlog] = await Promise.all([
        fetch(API_PRODUCTOS),
        fetch(API_USUARIOS),
        fetch(API_ORDENES),
        fetch(API_BLOGS),
      ]);

      const dataProd = await resProd.json();
      const dataUsu = await resUsu.json();
      const dataOrd = await resOrd.json();
      const dataBlog = await resBlog.json();

      setProductos(dataProd);
      setUsuarios(dataUsu);
      setOrdenes(dataOrd);
      setBlogs(dataBlog);
    } catch (err) {}
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
