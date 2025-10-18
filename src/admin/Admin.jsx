import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminBarra from "../components/AdminBarra";

function Admin() {
  return (
    <div className="admin-container">
      <AdminHeader />
      <div className="container-fluid main-bg p-4">
        <div className="row">
          <div className="col-md-2">
            <AdminBarra />
          </div>
          <div className="col-md-10">
            <h2 className="text-title">Dashboard</h2>
            <p className="text-subtitle">Resumen de actividades</p>

            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card card-custom text-center">
                  <div className="card-body">
                    <h5 className="card-title">Compras</h5>
                    <p className="card-text fs-3">120</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-custom text-center">
                  <div className="card-body">
                    <h5 className="card-title">Productos</h5>
                    <p className="card-text fs-3">58</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-custom text-center">
                  <div className="card-body">
                    <h5 className="card-title">Usuarios</h5>
                    <p className="card-text fs-3">23</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
