import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import instanciaAxios from "../services/AxiosConfig"; 

function PreviewBlog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const cargarBlogs = async () => {
      try {
        
        const respuesta = await instanciaAxios.get("/blogs");
        
        
        setBlogs(respuesta.data.slice(0, 3));
      } catch (error) {
        console.error("Error cargando preview de blogs:", error);
      }
    };

    cargarBlogs();
  }, []);

  
  if (blogs.length === 0) return null;

  
  const limpiarHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">📖 Del Huerto a tu Mesa</h2>
        <div className="row g-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <img
                  src={blog.imagen || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt={blog.titulo}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <small className="text-muted">
                    {blog.fecha || "Reciente"}
                  </small>
                  <h5 className="card-title fw-bold mt-2">{blog.titulo}</h5>
                  <p className="card-text text-muted">
                    {blog.contenido
                      ? limpiarHTML(blog.contenido).substring(0, 80) + "..."
                      : ""}
                  </p>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="btn btn-link text-success p-0 fw-bold"
                  >
                    Leer artículo →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PreviewBlog;
