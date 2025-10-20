import React from 'react';
import CartaProducto from './CartaProducto.jsx'; 
import { getAllProducts } from '../data/productos.js';

function ProductGrid({ productos, agregarAlCarrito }) { 
    
    const articulosAmostrar = productos || []; 
    
    if (articulosAmostrar.length === 0) {
        return (
            <div className="alert alert-warning text-center mt-5" role="alert">
                No se encontraron productos que coincidan con su búsqueda o categoría.
            </div>
        );
    }

    return (
        <div className="row justify-content-center px-2"> 
            <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5 g-4">
                
                {articulosAmostrar.map(producto => (
                    
                    <CartaProducto
                        key={producto.id} 
                        producto={producto} 
                        onAddToCart={agregarAlCarrito} 
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductGrid;