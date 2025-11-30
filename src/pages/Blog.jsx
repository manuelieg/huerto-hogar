import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard.jsx";
import BlogService from "../services/BlogService.js";

function Blog() {
const [articulos, setArticulos] = useState([]);
const [cargando, setCargando] = useState(true);

useEffect(() => {
    BlogService.obtenerTodos()
    .then((response) => {
        setArticulos(response.data);
        setCargando(false);
    })
    .catch((error) => {
        console.error("Error al cargar el blog:", error);
        setCargando(false);
    });
}, []);

if (cargando) {
    return (
    <div className="container mt-5 pt-5 text-center">
        <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Cargando...</span>
        </div>
    </div>
    );
}

if (articulos.length === 0) {
    return (
    <div className="container mt-5 pt-5 text-center">
        <h2 className="text-muted">No hay artículos de blog disponibles.</h2>
    </div>
    );
}

return (
    <div className="container my-5">
    <h1 className="fw-bolder mb-4 text-center">
        Nuestro Blog de Huerto y Cocina
    </h1>
    <p className="lead text-center text-muted mb-5">
        Consejos, guías y recetas para una vida más fresca y natural.
    </p>

    <div className="row g-4 justify-content-center">
        {articulos.map((articulo) => (
        <BlogCard key={articulo.id} article={articulo} />
        ))}
    </div>
    </div>
);
}

export default Blog;
