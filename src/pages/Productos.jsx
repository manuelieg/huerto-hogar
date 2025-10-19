import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllProducts } from '../data/productos.js'; 
import { categorias } from '../data/categorias.js'; 
import ProductGrid from '../components/ProductGrid.jsx';

const Productos = ({ onAddToCart }) => { 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const categoriaParam = params.get('categoria'); 

    const [productosFiltrados, setProductosFiltrados] = useState([]);
    
    const categoriaInfo = categorias.find(c => c.id === categoriaParam);
    
    useEffect(() => {
        const productosBase = getAllProducts(); 
        let filtrados = productosBase;
        
        if (categoriaParam) {
            filtrados = filtrados.filter(p => p.id.startsWith(categoriaParam));
        }
        
        setProductosFiltrados(filtrados);
    }, [categoriaParam]);


    return (
        <div className="container mt-4 mb-5">
            
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

            <ProductGrid 
                productos={productosFiltrados} 
                onAddToCart={onAddToCart} 
            />
        </div>
    );
};

export default Productos;





