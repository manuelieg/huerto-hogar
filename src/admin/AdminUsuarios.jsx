import React, { useState, useEffect } from 'react';
import { usuarios as usuariosIniciales } from '../data/usuarios.js';

function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState(() => {
        const guardado = localStorage.getItem("usuarios");
        return guardado ? JSON.parse(guardado) : usuariosIniciales;
    });

    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        id: '', nombre: '', apellido: '', email: '', password: ''
    });

    useEffect(() => {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }, [usuarios]);

    const agregarUsuario = () => {
        if (!nuevoUsuario.id || !nuevoUsuario.nombre || !nuevoUsuario.email) {
            alert('ID, Nombre y Email son obligatorios.');
            return;
        }
        setUsuarios([...usuarios, nuevoUsuario]);
        setNuevoUsuario({ id: '', nombre: '', apellido: '', email: '', password: '' });
    };

    const eliminarUsuario = (id) => {
        if (window.confirm('¿Eliminar este usuario?')) {
            setUsuarios(usuarios.filter(u => u.id !== id));
        }
    };

    const iniciarEdicion = (usuario) => setUsuarioEditando({ ...usuario });
    const guardarEdicion = () => {
        setUsuarios(usuarios.map(u => u.id === usuarioEditando.id ? usuarioEditando : u));
        setUsuarioEditando(null);
    };


    const FormAgregar = () => (
        <div className="card mb-4 p-3">
            <h5>Agregar Nuevo Usuario</h5>
            <input type="text" placeholder="ID" value={nuevoUsuario.id} onChange={e => setNuevoUsuario({ ...nuevoUsuario, id: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="Apellido" value={nuevoUsuario.apellido} onChange={e => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })} className="form-control mb-2" />
            <input type="email" placeholder="Email" value={nuevoUsuario.email} onChange={e => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} className="form-control mb-2" />
            <input type="password" placeholder="Contraseña" value={nuevoUsuario.password} onChange={e => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} className="form-control mb-2" />
            <button onClick={agregarUsuario} className="btn btn-success">Agregar Usuario</button>
        </div>
    );

    const FormEditar = () => {
        if (!usuarioEditando) return null;
        return (
            <div className="card mb-4 p-3 border-warning">
                <h5>Editar Usuario: {usuarioEditando.nombre}</h5>
                <input type="text" placeholder="Nombre" value={usuarioEditando.nombre} onChange={e => setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })} className="form-control mb-2" />
                <input type="text" placeholder="Apellido" value={usuarioEditando.apellido} onChange={e => setUsuarioEditando({ ...usuarioEditando, apellido: e.target.value })} className="form-control mb-2" />
                <input type="email" placeholder="Email" value={usuarioEditando.email} onChange={e => setUsuarioEditando({ ...usuarioEditando, email: e.target.value })} className="form-control mb-2" />
                <input type="password" placeholder="Contraseña" value={usuarioEditando.password} onChange={e => setUsuarioEditando({ ...usuarioEditando, password: e.target.value })} className="form-control mb-2" />
                <button onClick={guardarEdicion} className="btn btn-primary me-2">Guardar Cambios</button>
                <button onClick={() => setUsuarioEditando(null)} className="btn btn-secondary">Cancelar</button>
            </div>
        );
    };


    const ListadoUsuarios = () => (
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
                    {usuarios.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.apellido}</td>
                            <td>{u.email}</td>
                            <td>{u.password}</td>
                            <td>
                                <button onClick={() => iniciarEdicion(u)} className="btn btn-sm btn-warning me-2">Editar</button>
                                <button onClick={() => eliminarUsuario(u.id)} className="btn btn-sm btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Usuarios</h2>
            <ListadoUsuarios />
            <FormAgregar />
            <FormEditar />
        </div>
    );
}

export default AdminUsuarios;
