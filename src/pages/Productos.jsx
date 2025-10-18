import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { productos as productosBase } from '../data/productos';
import ProductGrid from '../components/ProductGrid';

const Productos = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaParam = params.get('categoria');

  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    let filtrados = productosBase;
    if (categoriaParam) {
      filtrados = filtrados.filter(p => p.id.startsWith(categoriaParam));
    }
    setProductosFiltrados(filtrados);
  }, [categoriaParam]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        {categoriaParam ? `Productos - ${categoriaParam}` : 'Todos los Productos'}
      </h2>
      <ProductGrid productos={productosFiltrados} />
    </div>
  );
};

export default Productos;

