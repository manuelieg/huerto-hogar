import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usarAutenticacion } from '../context/GestionAutenticacion.jsx';

function IniciarSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { iniciarSesion } = usarAutenticacion();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const resultado = await iniciarSesion(email, password);

    if (resultado.success) {
      navigate('/');
    } else {
      setError(resultado.mensaje);
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4 fw-bold">Iniciar Sesión</h2>
        
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold">Ingresar</button>
        </form>
        
        <div className="text-center mt-3">
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
        </div>
    </div>
    </div>
);
}

export default IniciarSesion;