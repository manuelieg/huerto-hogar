import React, { useState, useEffect, useRef } from "react";

const API = "http://3.16.215.211:8080./api/blogs";

function ListadoBlogs({ listaBlogs, setBlogEditando, eliminarBlog }) {
    return (
        <div className="card mb-4 p-3">
            <h5>Listado de Blogs</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaBlogs.map((b) => (
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.titulo}</td>
                            <td>{b.autor}</td>
                            <td>{b.fecha}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        setBlogEditando({
                                            ...b
                                        });
                                    }}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarBlog(b.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function FormularioAgregar({ nuevoBlog, setNuevoBlog, agregarBlog, addRef }) {
    return (
        <div ref={addRef} className="card mb-4 p-3">
            <h5>Crear Nuevo Blog</h5>

            <input
                className="form-control mb-2"
                placeholder="ID"
                value={nuevoBlog.id}
                onChange={(e) => setNuevoBlog({ ...nuevoBlog, id: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Título"
                value={nuevoBlog.titulo}
                onChange={(e) => setNuevoBlog({ ...nuevoBlog, titulo: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Autor"
                value={nuevoBlog.autor}
                onChange={(e) => setNuevoBlog({ ...nuevoBlog, autor: e.target.value })}
            />

            <textarea
                className="form-control mb-2"
                placeholder="Contenido"
                value={nuevoBlog.contenido}
                onChange={(e) => setNuevoBlog({ ...nuevoBlog, contenido: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="URL Imagen"
                value={nuevoBlog.imagen}
                onChange={(e) => setNuevoBlog({ ...nuevoBlog, imagen: e.target.value })}
            />

            <button className="btn btn-success" onClick={agregarBlog}>
                Crear Blog
            </button>
        </div>
    );
}

function FormularioEditar({ blogEditando, setBlogEditando, guardarEdicion, editRef }) {
    if (!blogEditando) return null;

    return (
        <div ref={editRef} className="card mb-4 p-3 border-warning">
            <h5>Editar Blog: {blogEditando.titulo}</h5>

            <input
                className="form-control mb-2"
                value={blogEditando.titulo}
                onChange={(e) =>
                    setBlogEditando({ ...blogEditando, titulo: e.target.value })
                }
            />

            <input
                className="form-control mb-2"
                value={blogEditando.autor}
                onChange={(e) =>
                    setBlogEditando({ ...blogEditando, autor: e.target.value })
                }
            />

            <textarea
                className="form-control mb-2"
                value={blogEditando.contenido}
                onChange={(e) =>
                    setBlogEditando({ ...blogEditando, contenido: e.target.value })
                }
            />

            <input
                className="form-control mb-2"
                value={blogEditando.imagen}
                onChange={(e) =>
                    setBlogEditando({ ...blogEditando, imagen: e.target.value })
                }
            />

            <button className="btn btn-primary me-2" onClick={guardarEdicion}>
                Guardar Cambios
            </button>

            <button className="btn btn-secondary" onClick={() => setBlogEditando(null)}>
                Cancelar
            </button>
        </div>
    );
}

function AdminBlogs() {
    const [listaBlogs, setListaBlogs] = useState([]);
    const [nuevoBlog, setNuevoBlog] = useState({
        id: "",
        titulo: "",
        contenido: "",
        autor: "",
        imagen: ""
    });
    const [blogEditando, setBlogEditando] = useState(null);

    const editRef = useRef(null);
    const addRef = useRef(null);

    const cargarBlogs = async () => {
        const res = await fetch(API);
        const data = await res.json();
        setListaBlogs(data);
    };

    useEffect(() => {
        cargarBlogs();
    }, []);

    const agregarBlog = async () => {
        if (!nuevoBlog.id || !nuevoBlog.titulo) return;

        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoBlog),
        });

        const creado = await res.json();
        setListaBlogs((prev) => [...prev, creado]);

        setNuevoBlog({
            id: "",
            titulo: "",
            contenido: "",
            autor: "",
            imagen: ""
        });
    };

    const eliminarBlog = async (id) => {
        if (!window.confirm("¿Eliminar este blog?")) return;

        await fetch(`${API}/${id}`, { method: "DELETE" });

        setListaBlogs((prev) => prev.filter((b) => b.id !== id));
    };

    const guardarEdicion = async () => {
        const res = await fetch(`${API}/${blogEditando.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogEditando),
        });

        const actualizado = await res.json();

        setListaBlogs((prev) =>
            prev.map((b) => (b.id === actualizado.id ? actualizado : b))
        );

        setBlogEditando(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Blogs</h2>

            <FormularioEditar
                blogEditando={blogEditando}
                setBlogEditando={setBlogEditando}
                guardarEdicion={guardarEdicion}
                editRef={editRef}
            />

            <ListadoBlogs
                listaBlogs={listaBlogs}
                setBlogEditando={setBlogEditando}
                eliminarBlog={eliminarBlog}
            />

            <FormularioAgregar
                nuevoBlog={nuevoBlog}
                setNuevoBlog={setNuevoBlog}
                agregarBlog={agregarBlog}
                addRef={addRef}
            />
        </div>
    );
}

export default AdminBlogs;


