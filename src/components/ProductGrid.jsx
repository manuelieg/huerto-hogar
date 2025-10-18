import React from 'react';
import ProductCard from './ProductCard.jsx'; 
import { getAllProducts } from '../data/productos.js'; 

const ProductGrid = () => {
    
    const productos = getAllProducts() || []; 
    
    if (productos.length === 0) {
        return (
            <div className="alert alert-info text-center mt-5" role="alert">
                No se encontraron productos disponibles en este momento.
            </div>
        );
    }

    return (
        <div className="row justify-content-center px-2"> 
            <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5 g-4">
                
                {productos.map(producto => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;