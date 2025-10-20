import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Importamos la función que obtiene TODOS los productos y el array de categorías
import { getAllProducts } from '../data/productos.js'; 
import { categorias } from '../data/categorias.js'; 
import ProductGrid from '../components/ProductGrid.jsx'; // ⬅️ CRÍTICO: El Grid

const Productos = () => {
    // ⬅️ Ya no necesitamos recibir onAddToCart como prop, el Grid lo obtiene del Manager
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoriaParam = params.get('categoria'); 

    // Estado para almacenar los productos que cumplen el filtro
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    
    // Busca la información detallada de la categoría actual
    const categoriaInfo = categorias.find(c => c.id === categoriaParam);
    
    // Función de filtrado: se ejecuta cada vez que cambia la URL (categoriaParam)
    useEffect(() => {
        const productosBase = getAllProducts(); 
        let filtrados = productosBase;
        
        if (categoriaParam) {
            // Filtra los productos por ID (asumiendo que el ID de producto empieza por el ID de la categoría, ej: FR001 -> FR)
            filtrados = filtrados.filter(p => p.id.startsWith(categoriaParam));
        }
        
        // Actualiza el estado con la lista filtrada o la lista completa
        setProductosFiltrados(filtrados);
    }, [categoriaParam]);


    return (
        <div className="container mt-4 mb-5">
            
            {/* 1. Banner Dinámico de la Categoría (Opcional) */}
            {categoriaInfo && categoriaInfo.imagen && (
                <div
                    className="mb-4 rounded-3 overflow-hidden shadow-sm"
                    style={{
                        height: '250px',
                        backgroundImage: `url(${categoriaInfo.imagen})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div>
            )}

            {/* 2. Título de la Página */}
            <div className="mt-4 mb-5">
                <h2 className="text-center fw-bolder mb-3 text-dark">
                    {categoriaInfo ? categoriaInfo.nombre : 'Todos los Productos'}
                </h2>

                {categoriaInfo && (
                    <p className="text-center text-muted px-3">
                        {categoriaInfo.descripcion}
                    </p>
                )}
            </div>

            {/* 3. Grilla de Productos Filtrada */}
            {/* ⬅️ CRÍTICO: Pasamos la lista filtrada. El Grid ya NO necesita el onAddToCart aquí. */}
            <ProductGrid 
                productos={productosFiltrados} 
            />
        </div>
    );
};

export default Productos;