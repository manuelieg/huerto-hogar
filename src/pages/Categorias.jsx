import React from 'react';
import { Link } from 'react-router-dom';
import { categorias } from '../data/categorias.js'; // 👈 importamos el JSON

const Categorias = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Categorías</h2>
      <div className="row">
        {categorias.map(cat => (
          <div key={cat.id} className="col-6 col-md-3 mb-4">
            <Link to={cat.link} className="text-decoration-none">
              <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                <div style={{ height: '150px', overflow: 'hidden' }}>
                  {cat.imagen ? (
                    <img 
                      src={cat.imagen} 
                      alt={cat.nombre} 
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="bg-secondary text-white d-flex justify-content-center align-items-center w-100 h-100">
                      Sin imagen
                    </div>
                  )}
                </div>
                <div className="card-body text-center">
                  <h5 className="fw-bold text-dark">{cat.nombre}</h5>
                  <p className="text-muted small">{cat.descripcion.slice(0, 100)}...</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;

