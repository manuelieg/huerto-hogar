import React, { useState, useEffect } from "react";
import axios from "../services/AxiosConfig";

function Admin() {
  const [stats, setStats] = useState({
    productos: 0,
    usuarios: 0,
    ordenes: 0,
    blogs: 0
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resProd, resUsu, resOrd, resBlog] = await Promise.all([
          axios.get("/productos"),
          axios.get("/usuarios"),
          axios.get("/ordenes"),
          axios.get("/blogs"),
        ]);

        setStats({
          productos: resProd.data.length,
          usuarios: resUsu.data.length,
          ordenes: resOrd.data.length,
          blogs: resBlog.data.length
        });
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Panel de Control General</h2>
        <p className="text-muted">Resumen de actividad del Huerto</p>
      </div>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card card-admin kpi-card border-primary p-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <div className="kpi-label text-primary">Órdenes</div>
                    <div className="kpi-value">{stats.ordenes}</div>
                </div>
                <i className="bi bi-cart-check fs-1 text-primary opacity-25"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card card-admin kpi-card border-success p-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <div className="kpi-label text-success">Productos</div>
                    <div className="kpi-value">{stats.productos}</div>
                </div>
                <i className="bi bi-box-seam fs-1 text-success opacity-25"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card card-admin kpi-card border-warning p-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <div className="kpi-label text-warning">Usuarios</div>
                    <div className="kpi-value">{stats.usuarios}</div>
                </div>
                <i className="bi bi-people fs-1 text-warning opacity-25"></i>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card card-admin kpi-card border-info p-3">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <div className="kpi-label text-info">Blogs</div>
                    <div className="kpi-value">{stats.blogs}</div>
                </div>
                <i className="bi bi-journal-text fs-1 text-info opacity-25"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center text-muted">
          <i className="bi bi-bar-chart-line display-1 opacity-25"></i>
          <p className="mt-3">Selecciona una opción del menú lateral para gestionar.</p>
      </div>
    </div>
  );
}

export default Admin;
