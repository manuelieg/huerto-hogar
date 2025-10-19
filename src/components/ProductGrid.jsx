import React from 'react';
// ⬅️ CRÍTICO: Debe existir en la misma carpeta
import ProductCard from './ProductCard.jsx'; 

// ⬅️ CRÍTICO: Recibe la lista de productos a mostrar y la función del carrito
const ProductGrid = ({ productos, onAddToCart }) => { 
    
    // Usamos el array de productos recibido, si es null o undefined, usa un array vacío.
    const itemsToRender = productos || []; 
    
    if (itemsToRender.length === 0) {
        return (
            <div className="alert alert-warning text-center mt-5" role="alert">
                No se encontraron productos que coincidan con su búsqueda o categoría.
            </div>
        );
    }

    return (
        <div className="row justify-content-center px-2"> 
            {/* El grid responsivo con espaciado (g-4) */}
            <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-5 g-4">
                
                {itemsToRender.map(producto => (
                    // ⬅️ CRÍTICO: Pasar la función de estado global (onAddToCart) a cada tarjeta
                    <ProductCard 
                        key={producto.id} 
                        producto={producto} 
                        onAddToCart={onAddToCart} // Propagación
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;