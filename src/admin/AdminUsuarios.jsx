import React, { useState, useEffect } from 'react';
import { usuarios as usuariosBase } from '../data/usuarios.js';

function AdminUsuarios() {
    
    const [listaUsuarios, setListaUsuarios] = useState(() => {
        const guardado = localStorage.getItem("usuarios");
        return guardado ? JSON.parse(guardado) : usuariosBase;
    });

    const [entradaEditando, setEntradaEditando] = useState(null);
    const [nuevaEntrada, setNuevaEntrada] = useState({
        id: '', nombre: '', apellido: '', email: '', password: ''
    });

    // Estado para controlar si se muestran u ocultan las contraseñas
    const [mostrarPasswords, setMostrarPasswords] = useState({});

    useEffect(() => {
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    }, [listaUsuarios]);

    const agregarUsuario = () => {
        if (!nuevaEntrada.id || !nuevaEntrada.nombre || !nuevaEntrada.email) {
            alert('ID, Nombre y Email son obligatorios.'); 
            return;
        }
        setListaUsuarios([...listaUsuarios, nuevaEntrada]);
        setNuevaEntrada({ id: '', nombre: '', apellido: '', email: '', password: '' });
    };

    const eliminarUsuario = (id) => {
        if (window.confirm('¿Eliminar este usuario?')) { 
            setListaUsuarios(listaUsuarios.filter(u => u.id !== id));
        }
    };

    const iniciarEdicion = (usuario) => setEntradaEditando({ ...usuario });
    const guardarEdicion = () => {
        setListaUsuarios(listaUsuarios.map(u => u.id === entradaEditando.id ? entradaEditando : u));
        setEntradaEditando(null);
    };

    // Cambiar visibilidad de una contraseña específica
    const togglePassword = (id) => {
        setMostrarPasswords(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const FormularioAgregar = () => (
        <div className="card mb-4 p-3">
            <h5>Agregar Nuevo Usuario</h5>
            <input type="text" placeholder="ID" value={nuevaEntrada.id} onChange={e => setNuevaEntrada({ ...nuevaEntrada, id: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="Nombre" value={nuevaEntrada.nombre} onChange={e => setNuevaEntrada({ ...nuevaEntrada, nombre: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="Apellido" value={nuevaEntrada.apellido} onChange={e => setNuevaEntrada({ ...nuevaEntrada, apellido: e.target.value })} className="form-control mb-2" />
            <input type="email" placeholder="Email" value={nuevaEntrada.email} onChange={e => setNuevaEntrada({ ...nuevaEntrada, email: e.target.value })} className="form-control mb-2" />
            <input type="password" placeholder="Contraseña" value={nuevaEntrada.password} onChange={e => setNuevaEntrada({ ...nuevaEntrada, password: e.target.value })} className="form-control mb-2" />
            <button onClick={agregarUsuario} className="btn btn-success">Agregar Usuario</button>
        </div>
    );

    const FormularioEditar = () => {
        if (!entradaEditando) return null;
        return (
            <div className="card mb-4 p-3 border-warning">
                <h5>Editar Usuario: {entradaEditando.nombre}</h5>
                <input type="text" placeholder="Nombre" value={entradaEditando.nombre} onChange={e => setEntradaEditando({ ...entradaEditando, nombre: e.target.value })} className="form-control mb-2" />
                <input type="text" placeholder="Apellido" value={entradaEditando.apellido} onChange={e => setEntradaEditando({ ...entradaEditando, apellido: e.target.value })} className="form-control mb-2" />
                <input type="email" placeholder="Email" value={entradaEditando.email} onChange={e => setEntradaEditando({ ...entradaEditando, email: e.target.value })} className="form-control mb-2" />
                <input type="password" placeholder="Contraseña" value={entradaEditando.password} onChange={e => setEntradaEditando({ ...entradaEditando, password: e.target.value })} className="form-control mb-2" />
                <button onClick={guardarEdicion} className="btn btn-primary me-2">Guardar Cambios</button>
                <button onClick={() => setEntradaEditando(null)} className="btn btn-secondary">Cancelar</button>
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
                    {listaUsuarios.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.apellido}</td>
                            <td>{u.email}</td>
                            <td>
                                {mostrarPasswords[u.id] 
                                    ? u.password 
                                    : '•'.repeat(u.password.length || 6)}
                                <button 
                                    onClick={() => togglePassword(u.id)} 
                                    className="btn btn-sm btn-outline-secondary ms-2"
                                >
                                    {mostrarPasswords[u.id] ? 'Ocultar' : 'Ver'}
                                </button>
                            </td>
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
            <FormularioEditar />
            <FormularioAgregar />
        </div>
    );
}

export default AdminUsuarios;
