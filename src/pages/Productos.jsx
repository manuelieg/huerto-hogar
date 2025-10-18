import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productos as productosBase } from '../data/productos';
import { categorias } from '../data/categorias';
import ProductGrid from '../components/ProductGrid';

const Productos = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaParam = params.get('categoria');

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const categoriaInfo = categorias.find(c => c.id === categoriaParam);

  useEffect(() => {
    let filtrados = productosBase;
    if (categoriaParam) {
      filtrados = filtrados.filter(p => p.id.startsWith(categoriaParam));
    }
    setProductosFiltrados(filtrados);
  }, [categoriaParam]);

  return (
    <div className="container mt-4 mb-5"> {/* ↑ Separación desde el header */}
      
      {/* Banner dinámico de la categoría */}
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

      {/* Contenedor de título y descripción con separación */}
      <div className="mt-4 mb-4">
        <h2 className="text-center mb-3">
          {categoriaInfo ? categoriaInfo.nombre : 'Todos los Productos'}
        </h2>

        {categoriaInfo && (
          <p className="text-center text-muted px-3">
            {categoriaInfo.descripcion}
          </p>
        )}
      </div>

      {/* Grilla de productos */}
      <ProductGrid productos={productosFiltrados} />
    </div>
  );
};

export default Productos;






