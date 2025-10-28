import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts } from "../data/productos.js";
import { categorias } from "../data/categorias.js";
import ProductGrid from "../components/ProductGrid.jsx";

function Productos() {
const ubicacion = useLocation();
const parametros = new URLSearchParams(ubicacion.search);
const parametroCategoria = parametros.get("categoria");

const [productosFiltrados, setProductosFiltrados] = useState([]);

const informacionCategoria = categorias.find(
    (c) => c.id === parametroCategoria
);

useEffect(() => {
    const productosBase = getAllProducts();
    let filtrados = productosBase;

    if (parametroCategoria) {
    filtrados = filtrados.filter((p) => p.id.startsWith(parametroCategoria));
    }

    setProductosFiltrados(filtrados);
}, [parametroCategoria]);

return (
    <div className="container mt-4 mb-5">
{informacionCategoria && informacionCategoria.imagen && (
        <div
        className="mb-4 rounded-3 overflow-hidden shadow-sm"
        style={{
            height: "250px",
            backgroundImage: `url(${informacionCategoria.imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        ></div>
    )}

    <div className="mt-4 mb-5">
        <h2 className="text-center fw-bolder mb-3 text-dark">
        {informacionCategoria
            ? informacionCategoria.nombre
            : "Todos los Productos"}
        </h2>

        {informacionCategoria && (
        <p className="text-center text-muted px-3">
            {informacionCategoria.descripcion}
        </p>
        )}
    </div>

    <ProductGrid productos={productosFiltrados} />
    </div>
);
}

export default Productos;
