import React, { useState, useEffect, useRef } from "react";
import axios from '../services/AxiosConfig'; 

function ListadoEntradas({ listaUsuarios, setEntradaEditando, eliminarUsuario }) {
    return (
        <div className="card mb-4 p-3 shadow-sm">
            <h5 className="mb-3">Listado de Usuarios</h5>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaUsuarios.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre} {u.apellido}</td>
                                <td>{u.email}</td>
                                <td>
                                    {/* Lógica visual para distinguir Admin de Cliente */}
                                    <span className={`badge ${u.rol === 'ROLE_ADMIN' || u.rol === 'ADMIN' ? 'bg-danger' : 'bg-primary'}`}>
                                        {u.rol === 'ROLE_ADMIN' ? 'ADMINISTRADOR' : 'CLIENTE'}
                                    </span>
                                </td>
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
        </div>
    );
}

function FormularioAgregar({ nuevaEntrada, setNuevaEntrada, agregarUsuario, addRef }) {
    return (
        <div ref={addRef} className="card mb-4 p-3 shadow-sm border-success">
            <h5 className="text-success">Agregar Nuevo Usuario</h5>

            <div className="row">
                <div className="col-md-6 mb-2">
                    <input
                        className="form-control"
                        placeholder="Nombre"
                        value={nuevaEntrada.nombre}
                        onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, nombre: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        className="form-control"
                        placeholder="Apellido"
                        value={nuevaEntrada.apellido}
                        onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, apellido: e.target.value })}
                    />
                </div>
            </div>

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

            {/* SELECTOR DE ROL (NUEVO) */}
            <select 
                className="form-select mb-3"
                value={nuevaEntrada.rol}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, rol: e.target.value })}
            >
                <option value="CLIENTE">Cliente</option>
                <option value="ROLE_ADMIN">Administrador</option>
            </select>

            <button className="btn btn-success w-100" onClick={agregarUsuario}>
                Crear Usuario
            </button>
        </div>
    );
}

function FormularioEditar({ entradaEditando, setEntradaEditando, guardarEdicion, editRef }) {
    if (!entradaEditando) return null;

    return (
        <div ref={editRef} className="card mb-4 p-3 border-warning shadow-sm">
            <h5 className="text-warning">Editar Usuario: {entradaEditando.nombre}</h5>

            <div className="row">
                <div className="col-md-6 mb-2">
                    <input
                        className="form-control"
                        value={entradaEditando.nombre}
                        onChange={(e) => setEntradaEditando({ ...entradaEditando, nombre: e.target.value })}
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        className="form-control"
                        value={entradaEditando.apellido}
                        onChange={(e) => setEntradaEditando({ ...entradaEditando, apellido: e.target.value })}
                    />
                </div>
            </div>

            <input
                type="email"
                className="form-control mb-2"
                value={entradaEditando.email}
                disabled 
            />

            {/* SELECTOR DE ROL PARA EDITAR (VITAL) */}
            <label className="form-label text-muted small">Rol del Usuario</label>
            <select 
                className="form-select mb-3"
                value={entradaEditando.rol}
                onChange={(e) => setEntradaEditando({ ...entradaEditando, rol: e.target.value })}
            >
                <option value="CLIENTE">Cliente</option>
                <option value="ROLE_ADMIN">Administrador</option>
            </select>

            <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-secondary" onClick={() => setEntradaEditando(null)}>
                    Cancelar
                </button>
                <button className="btn btn-primary" onClick={guardarEdicion}>
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
}

function AdminUsuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [nuevaEntrada, setNuevaEntrada] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        rol: "CLIENTE" 
    });

    const [entradaEditando, setEntradaEditando] = useState(null);

    const editRef = useRef(null);
    const addRef = useRef(null);

    const cargarUsuarios = async () => {
        try {
            const res = await axios.get("/usuarios");
            setListaUsuarios(res.data);
        } catch (err) {
            console.error("Error al cargar usuarios", err);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const agregarUsuario = async () => {
        if (!nuevaEntrada.nombre || !nuevaEntrada.email || !nuevaEntrada.password) {
            alert("Faltan datos obligatorios");
            return;
        }

        try {
            const res = await axios.post("/usuarios", nuevaEntrada);
            setListaUsuarios((prev) => [...prev, res.data]);
            
            setNuevaEntrada({ nombre: "", apellido: "", email: "", password: "", rol: "CLIENTE" });
        } catch (err) {
            console.error("Error creando usuario", err);
            alert("Error al crear usuario.");
        }
    };

    const eliminarUsuario = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

        try {
            await axios.delete(`/usuarios/${id}`);
            setListaUsuarios((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error("Error eliminando", err);
        }
    };

    const guardarEdicion = async () => {
        try {
            const res = await axios.put(`/usuarios/${entradaEditando.id}`, entradaEditando);
            
            setListaUsuarios((prev) =>
                prev.map((u) => (u.id === res.data.id ? res.data : u))
            );

            setEntradaEditando(null);
        } catch (err) {
            console.error("Error editando", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Panel de Usuarios</h2>

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