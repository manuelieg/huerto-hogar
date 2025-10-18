import React from 'react';
import { Link } from 'react-router-dom';
import { categorias } from '../data/categorias.js'; 

const Categorias = () => {
  return (
    <div className="container mt-4 mb-5"> {/* ↑ Separación desde el header */}
      <h2 className="text-center mb-4">Categorías</h2>
      <div className="row mt-3"> {/* ↑ Separación entre título y tarjetas */}
        {categorias.map(cat => (
          <div key={cat.id} className="col-6 col-md-3 mb-4">
            <Link to={cat.link} className="text-decoration-none">
              <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                {cat.imagen && cat.imagen.trim() !== "" && (
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img 
                      src={cat.imagen} 
                      alt={cat.nombre} 
                      className="img-fluid w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
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




