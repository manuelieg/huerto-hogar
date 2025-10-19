import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ article }) => {
    
    // Asegura una ruta de imagen por defecto si no existe
    const imgSrc = article.image || '/images/blog/default.jpg';
    
    // Formatea la fecha
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Construye el enlace dinámico usando el ID del artículo
    const articleLink = `/blog/${article.id}`;

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                
                {/* Imagen del Artículo */}
                <Link to={articleLink}>
                    <img 
                        src={imgSrc} 
                        className="card-img-top" 
                        alt={article.title} 
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                </Link>

                <div className="card-body d-flex flex-column">
                    {/* Metadatos */}
                    <p className="card-text small text-muted mb-2">
                        <i className="bi bi-person-fill me-1"></i> {article.author} | 
                        <i className="bi bi-calendar me-1 ms-2"></i> {formatDate(article.date)}
                    </p>

                    {/* Título y Resumen */}
                    <Link to={articleLink} className="text-decoration-none text-dark">
                        <h5 className="card-title fw-bolder mb-3">{article.title}</h5>
                    </Link>
                    
                    <p className="card-text flex-grow-1">{article.summary}</p>
                    
                    {/* Botón de Leer Más */}
                    <div className="mt-auto pt-2">
                        <Link to={articleLink} className="btn btn-sm btn-outline-primary rounded-1">
                            Leer Artículo <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;