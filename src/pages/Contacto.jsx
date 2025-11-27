import React, { useState } from "react";

const Contacto = () => {
const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
});

const manejarCambio = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
};

const enviarFormulario = (e) => {
    e.preventDefault();
    alert("Gracias por enviar tu mensaje.");
    setDatosFormulario({ nombre: "", correo: "", mensaje: "" });
};

return (
    <div className="container my-5">
    <h2 className="mb-4 text-center">Contacto</h2>

    <div className="row">
        <div className="col-md-6 mb-4 d-flex flex-column align-items-center">
        <div className="text-center mb-3">
            <img
            src="/images/logo_header.png"
            alt="Logo HuertoHogar"
            className="img-fluid rounded shadow-sm mb-3"
            style={{ maxHeight: "300px", objectFit: "contain" }}
            />

            <h5>Santiago, Chile</h5>
            <h5>contacto@huertohogar.cl</h5>
        </div>
        </div>

        <div className="col-md-6">
        <h5>Envíanos un mensaje</h5>
        <form onSubmit={enviarFormulario}>
            <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
                Nombre
            </label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                value={datosFormulario.nombre}
                onChange={manejarCambio}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="correo" className="form-label">
                Correo electrónico
            </label>
            <input
                type="email"
                id="correo"
                name="correo"
                className="form-control"
                value={datosFormulario.correo}
                onChange={manejarCambio}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">
                Mensaje
            </label>
            <textarea
                id="mensaje"
                name="mensaje"
                className="form-control"
                rows="4"
                value={datosFormulario.mensaje}
                onChange={manejarCambio}
                required
            ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
            Enviar
            </button>
        </form>
        </div>
    </div>
    </div>
);
};

export default Contacto;
