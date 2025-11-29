import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usarAutenticacion } from '../context/GestionAutenticacion.jsx';

function RegistroUsuario() {
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { registrarse } = usarAutenticacion();

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const resultado = await registrarse(datos);

    if (resultado.success) {
      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      navigate('/login');
    } else {
      setError(resultado.mensaje);
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: '450px' }}>
        <h2 className="text-center mb-4 fw-bold">Crear Cuenta</h2>
        
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre Completo</label>
            <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Registrarse</button>
        </form>
        
        <div className="text-center mt-3">
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuario;
