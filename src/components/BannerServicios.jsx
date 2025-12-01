import React from "react";

function BannerServicios() {
return (
    <div className="bg-success text-white py-5 my-5">
    <div className="container">
        <div className="row text-center g-4">
        <div className="col-md-4">
            <i className="bi bi-truck display-4 mb-3"></i>
            <h4>Envío Rápido</h4>
            <p className="small opacity-75">Despacho en 24 horas a todo Santiago</p>
        </div>
        <div className="col-md-4">
            <i className="bi bi-shield-check display-4 mb-3"></i>
            <h4>Compra Segura</h4>
            <p className="small opacity-75">Tus datos protegidos con estándar SSL</p>
        </div>
        <div className="col-md-4">
            <i className="bi bi-heart display-4 mb-3"></i>
            <h4>100% Orgánico</h4>
            <p className="small opacity-75">Directo del campo a tu mesa</p>
        </div>
        </div>
    </div>
    </div>
);
}

export default BannerServicios;