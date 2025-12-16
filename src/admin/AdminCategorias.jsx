import React, { useState, useEffect, useRef } from "react";

import instanciaAxios from "../services/AxiosConfig";

function ListadoCategorias({ listaCategorias, setEntradaEditando, eliminarCategoria }) {
    return (
        <div className="card mb-4 p-3">
            <h5>Listado de Categorías</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCategorias.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.nombre}</td>
                            <td>{c.descripcion}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => setEntradaEditando({ ...c })}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarCategoria(c.id)}
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

function FormularioAgregar({ nuevaEntrada, setNuevaEntrada, agregarCategoria, addRef }) {
    return (
        <div ref={addRef} className="card mb-4 p-3">
            <h5>Agregar Nueva Categoría</h5>

            <input
                className="form-control mb-2"
                placeholder="ID (Opcional si es auto)"
                value={nuevaEntrada.id}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, id: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Nombre"
                value={nuevaEntrada.nombre}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, nombre: e.target.value })}
            />

            <textarea
                className="form-control mb-2"
                placeholder="Descripción"
                value={nuevaEntrada.descripcion}
                onChange={(e) =>
                    setNuevaEntrada({ ...nuevaEntrada, descripcion: e.target.value })
                }
            />

            <button className="btn btn-success" onClick={agregarCategoria}>
                Agregar Categoría
            </button>
        </div>
    );
}

function FormularioEditar({ entradaEditando, setEntradaEditando, guardarEdicion, editRef }) {
    if (!entradaEditando) return null;

    return (
        <div ref={editRef} className="card mb-4 p-3 border-warning">
            <h5>Editar Categoría: {entradaEditando.nombre}</h5>

            <input
                className="form-control mb-2"
                value={entradaEditando.nombre}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, nombre: e.target.value })
                }
            />

            <textarea
                className="form-control mb-2"
                value={entradaEditando.descripcion}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, descripcion: e.target.value })
                }
            />

            <button className="btn btn-primary me-2" onClick={guardarEdicion}>
                Guardar Cambios
            </button>

            <button className="btn btn-secondary" onClick={() => setEntradaEditando(null)}>
                Cancelar
            </button>
        </div>
    );
}

function AdminCategorias() {
    const [listaCategorias, setListaCategorias] = useState([]);
    const [nuevaEntrada, setNuevaEntrada] = useState({
        id: "",
        nombre: "",
        descripcion: "",
    });

    const [entradaEditando, setEntradaEditando] = useState(null);

    const editRef = useRef(null);
    const addRef = useRef(null);

    const cargarCategorias = async () => {
        try {
            
            const res = await instanciaAxios.get("/categorias");
            setListaCategorias(res.data);
        } catch (err) {
            console.error("Error cargando categorías", err);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const agregarCategoria = async () => {
        if (!nuevaEntrada.nombre) return;

        try {

            const res = await instanciaAxios.post("/categorias", nuevaEntrada);

            setListaCategorias((prev) => [...prev, res.data]);

            setNuevaEntrada({
                id: "",
                nombre: "",
                descripcion: "",
            });
        } catch (err) {
            console.error("Error creando categoría", err);
        }
    };

    const eliminarCategoria = async (id) => {
        if (!window.confirm("¿Eliminar esta categoría?")) return;

        try {
            
            await instanciaAxios.delete(`/categorias/${id}`);
            setListaCategorias((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error("Error eliminando categoría", err);
        }
    };

    const guardarEdicion = async () => {
        try {

            const res = await instanciaAxios.put(`/categorias/${entradaEditando.id}`, entradaEditando);
            const actualizada = res.data;

            setListaCategorias((prev) =>
                prev.map((c) => (c.id === actualizada.id ? actualizada : c))
            );

            setEntradaEditando(null);
        } catch (err) {
            console.error("Error editando categoría", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Categorías</h2>

            <FormularioEditar
                entradaEditando={entradaEditando}
                setEntradaEditando={setEntradaEditando}
                guardarEdicion={guardarEdicion}
                editRef={editRef}
            />

            <ListadoCategorias
                listaCategorias={listaCategorias}
                setEntradaEditando={setEntradaEditando}
                eliminarCategoria={eliminarCategoria}
            />

            <FormularioAgregar
                nuevaEntrada={nuevaEntrada}
                setNuevaEntrada={setNuevaEntrada}
                agregarCategoria={agregarCategoria}
                addRef={addRef}
            />
        </div>
    );
}

export default AdminCategorias;