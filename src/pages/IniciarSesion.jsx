import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usarAutenticacion } from "../context/GestionAutenticacion.jsx";

function IniciarSesion() {
const navegar = useNavigate();
const { iniciarSesion } = usarAutenticacion();
const [nombreUsuario, setNombreUsuario] = useState("");
const [contrasena, setContrasena] = useState("");
const [error, setError] = useState("");

const manejarEnvio = (e) => {
    e.preventDefault();
    setError("");

    const exito = iniciarSesion(nombreUsuario, contrasena);

    if (exito) {
    navegar("/admin");
    } else {
    setError("Credenciales inválidas. Intenta de nuevo.");
    }
};

return (
    <div className="container my-5">
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 p-4">
            <h2 className="text-center fw-bolder mb-4">Iniciar Sesión</h2>
            <p className="text-center text-muted small mb-4">
              Usa las credenciales de prueba: **admin / 123**
            </p>

            {error && (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
            )}

            <form onSubmit={manejarEnvio}>
            <div className="mb-3">
                <label htmlFor="nombreUsuario" className="form-label">
                Usuario / Correo
                </label>
                <input
                type="text"
                className="form-control rounded-1"
                id="nombreUsuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="contrasena" className="form-label">
                Contraseña
                </label>
                <input
                type="password"
                className="form-control rounded-1"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100 rounded-1 py-2 mt-3 fw-bold"
            >
                Ingresar
            </button>
            </form>

            <p className="text-center mt-4">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
        </div>
        </div>
    </div>
    </div>
);
}

export default IniciarSesion;
