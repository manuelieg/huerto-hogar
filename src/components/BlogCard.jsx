import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ article }) {
const rutaImagen = article.image || "/images/blog/default.jpg";

const formatearFecha = (cadenaFecha) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(cadenaFecha).toLocaleDateString("es-ES", options);
};

const enlaceArticulo = `/blog/${article.id}`;

return (
    <div className="col-md-6 col-lg-4 mb-4">
    <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
        <Link to={enlaceArticulo}>
        <img
            src={rutaImagen}
            className="card-img-top"
            alt={article.title}
            style={{ height: "200px", objectFit: "cover" }}
        />
        </Link>

        <div className="card-body d-flex flex-column">
        <p className="card-text small text-muted mb-2">
            <i className="bi bi-person-fill me-1"></i> {article.author} |
            <i className="bi bi-calendar me-1 ms-2"></i>
            {formatearFecha(article.date)}
        </p>

        <Link to={enlaceArticulo} className="text-decoration-none text-dark">
            <h5 className="card-title fw-bolder mb-3">{article.title}</h5>
        </Link>

        <p className="card-text flex-grow-1">{article.summary}</p>

        <div className="mt-auto pt-2">
            <Link
            to={enlaceArticulo}
            className="btn btn-sm btn-outline-primary rounded-1"
            >
            Leer Artículo <i className="bi bi-arrow-right"></i>
            </Link>
        </div>
        </div>
    </div>
    </div>
);
}

export default BlogCard;
