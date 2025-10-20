import React, { useState, useEffect } from 'react';
import { categorias as categoriasBase } from '../data/categorias.js';

function AdminCategorias() {
    
    const [listaCategorias, setListaCategorias] = useState(() => {
        const guardado = localStorage.getItem("categorias");
        return guardado ? JSON.parse(guardado) : categoriasBase;
    });

    const [nuevaEntrada, setNuevaEntrada] = useState({
        id: '', nombre: '', descripcion: '', imagen: '', link: ''
    });

    const [entradaEditando, setEntradaEditando] = useState(null);

    useEffect(() => {
        localStorage.setItem("categorias", JSON.stringify(listaCategorias));
    }, [listaCategorias]);

    const agregarCategoria = () => {
        if (!nuevaEntrada.id || !nuevaEntrada.nombre) {
            alert('ID y Nombre son obligatorios.'); 
            return;
        }
        setListaCategorias([...listaCategorias, nuevaEntrada]);
        setNuevaEntrada({ id: '', nombre: '', descripcion: '', imagen: '', link: '' });
    };

    const iniciarEdicion = (cat) => setEntradaEditando({ ...cat });

    const guardarEdicion = () => {
        setListaCategorias(listaCategorias.map(c => c.id === entradaEditando.id ? entradaEditando : c));
        setEntradaEditando(null);
    };

    const eliminarCategoria = (id) => {
        if (window.confirm('¿Eliminar esta categoría?')) { 
            setListaCategorias(listaCategorias.filter(c => c.id !== id));
        }
    };

    const FormularioAgregar = () => (
        <div className="card mb-4 p-3">
            <h5>Agregar Nueva Categoría</h5>
            <input type="text" placeholder="ID" value={nuevaEntrada.id} onChange={e => setNuevaEntrada({ ...nuevaEntrada, id: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="Nombre" value={nuevaEntrada.nombre} onChange={e => setNuevaEntrada({ ...nuevaEntrada, nombre: e.target.value })} className="form-control mb-2" />
            <textarea placeholder="Descripción" value={nuevaEntrada.descripcion} onChange={e => setNuevaEntrada({ ...nuevaEntrada, descripcion: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="URL Imagen" value={nuevaEntrada.imagen} onChange={e => setNuevaEntrada({ ...nuevaEntrada, imagen: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="Link" value={nuevaEntrada.link} onChange={e => setNuevaEntrada({ ...nuevaEntrada, link: e.target.value })} className="form-control mb-2" />
            <button onClick={agregarCategoria} className="btn btn-success">Agregar Categoría</button>
        </div>
    );

    const FormularioEditar = () => {
        if (!entradaEditando) return null;
        return (
            <div className="card mb-4 p-3 border-warning">
                <h5>Editar Categoría: {entradaEditando.nombre}</h5>
                <input type="text" placeholder="Nombre" value={entradaEditando.nombre} onChange={e => setEntradaEditando({ ...entradaEditando, nombre: e.target.value })} className="form-control mb-2" />
                <textarea placeholder="Descripción" value={entradaEditando.descripcion} onChange={e => setEntradaEditando({ ...entradaEditando, descripcion: e.target.value })} className="form-control mb-2" />
                <input type="text" placeholder="URL Imagen" value={entradaEditando.imagen} onChange={e => setEntradaEditando({ ...entradaEditando, imagen: e.target.value })} className="form-control mb-2" />
                <input type="text" placeholder="Link" value={entradaEditando.link} onChange={e => setEntradaEditando({ ...entradaEditando, link: e.target.value })} className="form-control mb-2" />
                <button onClick={guardarEdicion} className="btn btn-primary me-2">Guardar Cambios</button>
                <button onClick={() => setEntradaEditando(null)} className="btn btn-secondary">Cancelar</button>
            </div>
        );
    };

    const ListadoCategorias = () => (
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
                    {listaCategorias.map(c => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.nombre}</td>
                            <td>{c.descripcion.slice(0, 50)}...</td>
                            <td>
                                <button onClick={() => iniciarEdicion(c)} className="btn btn-sm btn-warning me-2">Editar</button>
                                <button onClick={() => eliminarCategoria(c.id)} className="btn btn-sm btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Categorías</h2>
            <ListadoCategorias />
            <FormularioAgregar />
            <FormularioEditar />
        </div>
    );
}

export default AdminCategorias;
