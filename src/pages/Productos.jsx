import React from 'react';
import ProductGrid from '../components/ProductGrid.jsx'; 

const Productos = () => {
    return (
        <div className="container mt-4 mb-5">
            <h1 className="fw-bolder mb-4 text-dark text-center">Catálogo de Productos Frescos</h1>
            <p className="lead text-center text-muted mb-5">
                Explora nuestra selección de verduras y frutas orgánicas, listas para llevar a tu hogar.
            </p>
            
            <ProductGrid />
            
        </div>
    );
};

export default Productos;