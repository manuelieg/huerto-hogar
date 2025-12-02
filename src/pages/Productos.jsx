import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 
import ProductGrid from '../components/ProductGrid.jsx';

function Productos() {
const ubicacion = useLocation();
const parametros = new URLSearchParams(ubicacion.search);
const parametroCategoriaID = parametros.get('categoria');

const [productosFiltrados, setProductosFiltrados] = useState([]);
const [infoCategoria, setInfoCategoria] = useState(null);
const [cargando, setCargando] = useState(true);

useEffect(() => {
    const cargarDatos = async () => {
    setCargando(true);
    try {
        let urlProductos;
        
        if (parametroCategoriaID) {

        urlProductos = `http://3.16.215.211:8080/api/productos/buscar?prefijo=${parametroCategoriaID}`;

        const respCat = await axios.get(`http://3.16.215.211:8080/api/categorias/${parametroCategoriaID}`);
        setInfoCategoria(respCat.data);

        } else {
        urlProductos = "http://3.16.215.211:8080/api/productos";
        setInfoCategoria(null);
        }

        const respProd = await axios.get(urlProductos);
        setProductosFiltrados(respProd.data);

    } catch (error) {
        console.error("Error cargando datos:", error);
    } finally {
        setCargando(false);
    }
    };

    cargarDatos();
}, [parametroCategoriaID]);

if (cargando) {
    return <div className="text-center mt-5"><div className="spinner-border text-success"></div></div>;
}

return (
    <div className="container mt-4 mb-5">
      {/* BANNER DINÁMICO: Viene de MySQL */}
    {infoCategoria && infoCategoria.imagen && (
        <div
        className="mb-4 rounded-3 overflow-hidden shadow-sm"
        style={{
            height: "250px",
            backgroundImage: `url(${infoCategoria.imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        ></div>
    )}

    <div className="mt-4 mb-5">
        <h2 className="text-center fw-bolder mb-3 text-dark">
        {infoCategoria
            ? infoCategoria.nombre
            : "Todos los Productos"}
        </h2>

        {infoCategoria && (
        <p className="text-center text-muted px-3">
            {infoCategoria.descripcion}
        </p>
        )}
    </div>

    {productosFiltrados.length > 0 ? (
        <ProductGrid productos={productosFiltrados} />
    ) : (
        <div className="alert alert-warning text-center">No hay productos disponibles en esta categoría.</div>
    )}
    </div>
);
}

export default Productos;
