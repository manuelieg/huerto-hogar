import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuarios as usuariosBase } from '../data/usuarios.js';

function RegistroUsuario() {
    
    const navegar = useNavigate();
    
    const [datosFormulario, setDatosFormulario] = useState({ nombre: '', apellido: '', email: '', password: '' });
    const [listaUsuarios, setListaUsuarios] = useState(() => {
        const guardado = localStorage.getItem('usuarios');
        return guardado ? JSON.parse(guardado) : usuariosBase;
    });

    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    }, [listaUsuarios]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosFormulario(prev => ({ ...prev, [name]: value }));
    };

    const manejarEnvio = (e) => {
        e.preventDefault();

        const existe = listaUsuarios.find(u => u.email === datosFormulario.email);
        if (existe) {
            alert('El correo ya está registrado.');
            return;
        }

        setListaUsuarios([...listaUsuarios, { ...datosFormulario, id: Date.now().toString() }]);
        alert('Registro exitoso.');
        navegar('/login');
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-lg border-0 p-4">
                        <h2 className="text-center fw-bolder mb-4">Crear Cuenta</h2>

                        <form onSubmit={manejarEnvio}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" name="nombre" onChange={manejarCambio} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                    <input type="text" className="form-control" id="apellido" name="apellido" onChange={manejarCambio} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                    <input type="email" className="form-control" id="email" name="email" onChange={manejarCambio} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="password" name="password" onChange={manejarCambio} required />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-warning w-100 mt-4 fw-bold">Registrarse</button>
                        </form>

                        <p className="text-center mt-4">
                            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroUsuario;
