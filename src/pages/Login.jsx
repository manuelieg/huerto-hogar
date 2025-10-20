import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthManager.jsx'; 

const Login = () => {
    const navigate = useNavigate();
    const { handleLogin } = useAuth(); 
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const success = handleLogin(username, password); 

        if (success) {
            navigate('/admin');
        } else {
            setError('Credenciales inválidas. Intenta con "admin" y "123".');
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

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Usuario / Correo</label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-1" 
                                    id="username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required 
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input 
                                    type="password" 
                                    className="form-control rounded-1" 
                                    id="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 rounded-1 py-2 mt-3 fw-bold">
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
};

export default Login;