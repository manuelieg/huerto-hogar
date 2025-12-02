import React, { useState, useEffect, useRef } from "react";

const API = "http://3.16.215.211:8080./api/usuarios";

function ListadoEntradas({ listaUsuarios, setEntradaEditando, eliminarUsuario }) {
    return (
        <div className="card mb-4 p-3">
            <h5>Listado de Usuarios</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Contraseña</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.apellido}</td>
                            <td>{u.email}</td>
                            <td>{u.password}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => setEntradaEditando({ ...u })}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarUsuario(u.id)}
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

function FormularioAgregar({ nuevaEntrada, setNuevaEntrada, agregarUsuario, addRef }) {
    return (
        <div ref={addRef} className="card mb-4 p-3">
            <h5>Agregar Nuevo Usuario</h5>

            <input
                className="form-control mb-2"
                placeholder="ID"
                value={nuevaEntrada.id}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, id: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Nombre"
                value={nuevaEntrada.nombre}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, nombre: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Apellido"
                value={nuevaEntrada.apellido}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, apellido: e.target.value })}
            />

            <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={nuevaEntrada.email}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, email: e.target.value })}
            />

            <input
                type="password"
                className="form-control mb-2"
                placeholder="Contraseña"
                value={nuevaEntrada.password}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, password: e.target.value })}
            />

            <button className="btn btn-success" onClick={agregarUsuario}>
                Agregar Usuario
            </button>
        </div>
    );
}

function FormularioEditar({ entradaEditando, setEntradaEditando, guardarEdicion, editRef }) {
    if (!entradaEditando) return null;

    return (
        <div ref={editRef} className="card mb-4 p-3 border-warning">
            <h5>Editar Usuario: {entradaEditando.nombre}</h5>

            <input
                className="form-control mb-2"
                value={entradaEditando.nombre}
                onChange={(e) => setEntradaEditando({ ...entradaEditando, nombre: e.target.value })}
            />

            <input
                className="form-control mb-2"
                value={entradaEditando.apellido}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, apellido: e.target.value })
                }
            />

            <input
                type="email"
                className="form-control mb-2"
                value={entradaEditando.email}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, email: e.target.value })
                }
            />

            <input
                type="password"
                className="form-control mb-2"
                value={entradaEditando.password}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, password: e.target.value })
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

function AdminUsuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [nuevaEntrada, setNuevaEntrada] = useState({
        id: "",
        nombre: "",
        apellido: "",
        email: "",
        password: "",
    });

    const [entradaEditando, setEntradaEditando] = useState(null);

    const editRef = useRef(null);
    const addRef = useRef(null);

    const cargarUsuarios = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setListaUsuarios(data);
        } catch (err) {}
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const agregarUsuario = async () => {
        if (!nuevaEntrada.id || !nuevaEntrada.nombre || !nuevaEntrada.email) return;

        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaEntrada),
            });

            const creado = await res.json();
            setListaUsuarios((prev) => [...prev, creado]);

            setNuevaEntrada({
                id: "",
                nombre: "",
                apellido: "",
                email: "",
                password: "",
            });
        } catch (err) {}
    };

    const eliminarUsuario = async (id) => {
        if (!window.confirm("¿Eliminar este usuario?")) return;

        await fetch(`${API}/${id}`, { method: "DELETE" });
        setListaUsuarios((prev) => prev.filter((u) => u.id !== id));
    };

    const guardarEdicion = async () => {
        try {
            const res = await fetch(`${API}/${entradaEditando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(entradaEditando),
            });

            const actualizado = await res.json();

            setListaUsuarios((prev) =>
                prev.map((u) => (u.id === actualizado.id ? actualizado : u))
            );

            setEntradaEditando(null);
        } catch (err) {}
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Usuarios</h2>

            <FormularioEditar
                entradaEditando={entradaEditando}
                setEntradaEditando={setEntradaEditando}
                guardarEdicion={guardarEdicion}
                editRef={editRef}
            />

            <ListadoEntradas
                listaUsuarios={listaUsuarios}
                setEntradaEditando={setEntradaEditando}
                eliminarUsuario={eliminarUsuario}
            />

            <FormularioAgregar
                nuevaEntrada={nuevaEntrada}
                setNuevaEntrada={setNuevaEntrada}
                agregarUsuario={agregarUsuario}
                addRef={addRef}
            />
        </div>
    );
}

export default AdminUsuarios;
