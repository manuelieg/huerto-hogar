import React, { useState } from "react";
import axios from "axios";
import instanciaAxios from "../services/AxiosConfig";

const Contacto = () => {
const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
});

const [estado, setEstado] = useState({
    enviando: false,
    exito: false,
    error: null,
});

const manejarCambio = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
};

const enviarFormulario = async (e) => {
    e.preventDefault();
    setEstado({ enviando: true, exito: false, error: null });

    try {
    await instanciaAxios.post("/contactos", datosFormulario);

    setEstado({ enviando: false, exito: true, error: null });
    
    setDatosFormulario({ 
        nombre: "", 
        email: "", 
        telefono: "", 
        asunto: "", 
        mensaje: "" 
    });
    
    } catch (error) {
    console.error("Error al guardar contacto:", error);
    setEstado({
        enviando: false,
        exito: false,
        error: "Hubo un error al conectar con el servidor.",
    });
    }
};

return (
    <div className="container my-5">
    <h2 className="mb-4 text-center">Contacto</h2>
    <div className="row">
        
        <div className="col-md-5 mb-4 d-flex flex-column align-items-center justify-content-center">
        <div className="text-center">
            <img
            src="/images/logo_header.png"
            alt="Logo HuertoHogar"
            className="img-fluid rounded shadow-sm mb-4"
            style={{ maxHeight: "250px" }}
            />
            <h4>HuertoHogar</h4>
            <p className="text-muted">Santiago, Chile</p>
            <p className="text-muted">contacto@huertohogar.cl</p>
        </div>
        </div>

        <div className="col-md-7">
        <div className="card shadow-sm border-0">
            <div className="card-body p-4">
            <h5 className="card-title mb-4">Envíanos un mensaje</h5>

            {estado.exito && (
                <div className="alert alert-success">
                ¡Mensaje enviado y guardado correctamente!
                </div>
            )}
            {estado.error && (
                <div className="alert alert-danger">{estado.error}</div>
            )}

            <form onSubmit={enviarFormulario}>
                
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            name="nombre" 
                            className="form-control"
                            value={datosFormulario.nombre}
                            onChange={manejarCambio}
                            required
                            placeholder="Ej: Juan Pérez"
                            disabled={estado.enviando}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Teléfono</label>
                        <input
                            type="tel"
                            name="telefono"
                            className="form-control"
                            value={datosFormulario.telefono}
                            onChange={manejarCambio}
                            required
                            placeholder="+56 9..."
                            disabled={estado.enviando}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email" 
                            className="form-control"
                            value={datosFormulario.email}
                            onChange={manejarCambio}
                            required
                            placeholder="nombre@ejemplo.com"
                            disabled={estado.enviando}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Asunto</label>
                        <input
                            type="text"
                            name="asunto"
                            className="form-control"
                            value={datosFormulario.asunto}
                            onChange={manejarCambio}
                            required
                            placeholder="Consulta sobre..."
                            disabled={estado.enviando}
                        />
                    </div>
                </div>

                <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                    name="mensaje"
                    className="form-control"
                    rows="4"
                    value={datosFormulario.mensaje}
                    onChange={manejarCambio}
                    required
                    placeholder="Escribe aquí tu consulta..."
                    disabled={estado.enviando}
                ></textarea>
                </div>
                
                <div className="d-grid">
                    <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={estado.enviando}
                    >
                    {estado.enviando ? "Enviando..." : "Enviar Mensaje"}
                    </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
    </div>
);
};

export default Contacto;
