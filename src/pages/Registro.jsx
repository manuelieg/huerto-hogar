import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Registro simulado con éxito:', formData);
        
        navigate('/login');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card shadow-lg border-0 p-4">
                        <h2 className="text-center fw-bolder mb-4">Crear Cuenta</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                
                                <div className="col-md-6">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control rounded-1" id="nombre" name="nombre" onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                    <input type="text" className="form-control rounded-1" id="apellido" name="apellido" onChange={handleChange} required />
                                </div>
                                
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                    <input type="email" className="form-control rounded-1" id="email" name="email" onChange={handleChange} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control rounded-1" id="password" name="password" onChange={handleChange} required />
                                </div>
                            </div>
                            
                            <button type="submit" className="btn btn-warning w-100 rounded-1 py-2 mt-4 fw-bold">
                                Registrarse
                            </button>
                        </form>

                        <p className="text-center mt-4">
                            ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;