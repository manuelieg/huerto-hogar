import React from "react";
import BlogCard from "../components/BlogCard.jsx";
import { getAllArticles } from "../data/blog.js";

function Blog() {
const articulos = getAllArticles() || [];

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
