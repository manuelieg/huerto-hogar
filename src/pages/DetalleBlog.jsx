import React from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../data/blog.js";

const DetalleBlog = () => {
const { id } = useParams();

const article = getArticleById(id);

if (!article) {
    return (
    <div className="container mt-5 pt-5 text-center">
        <i className="bi bi-file-earmark-break display-4 text-danger mb-3"></i>
        <h2 className="mt-3">Artículo No Encontrado</h2>
        <p className="text-muted">
          El artículo con ID **{id}** no existe en el blog.
        </p>
        <Link to="/blog" className="btn btn-primary mt-3">
        Volver al Blog
        </Link>
    </div>
    );
}

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
};

return (
    <div className="container my-5" style={{ maxWidth: "900px" }}>
    <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <Link to="/blog" className="text-decoration-none">
            Blog
            </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
            {article.title}
        </li>
        </ol>
    </nav>

    <article className="card shadow-lg border-0 rounded-3 p-4 p-md-5">
        <h1 className="fw-bolder mb-3">{article.title}</h1>

        <p className="small text-muted mb-4 border-bottom pb-3">
        Publicado por <strong>{article.author}</strong> el{" "}
        {formatDate(article.date)}
        </p>

        <img
        src={article.image || "/images/blog/default.jpg"}
        alt={article.title}
        className="img-fluid rounded-3 mb-4"
        style={{ maxHeight: "400px", objectFit: "cover" }}
        />

        <div
        className="blog-content lead"
        dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-5 pt-3 border-top text-center">
        <Link to="/blog" className="btn btn-outline-secondary rounded-1">
            <i className="bi bi-arrow-left me-2"></i> Volver a los Artículos
        </Link>
        </div>
    </article>
    </div>
);
};

export default DetalleBlog;
