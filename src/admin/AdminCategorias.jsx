import React, { useState, useEffect } from 'react';
import { categorias as categoriasIniciales } from '../data/categorias.js';

function AdminCategorias() {
    const [categorias, setCategorias] = useState(() => {
        const guardado = localStorage.getItem("categorias");
        return guardado ? JSON.parse(guardado) : categoriasIniciales;
    });

    const [nuevaCategoria, setNuevaCategoria] = useState({
        id: '', nombre: '', descripcion: '', imagen: '', link: ''
    });

    const [categoriaEditando, setCategoriaEditando] = useState(null);

    useEffect(() => {
        localStorage.setItem("categorias", JSON.stringify(categorias));
    }, [categorias]);

    const agregarCategoria = () => {
        if (!nuevaCategoria.id || !nuevaCategoria.nombre) {
            alert('ID y Nombre son obligatorios.');
            return;
        }
        setCategorias([...categorias, nuevaCategoria]);
        setNuevaCategoria({ id: '', nombre: '', descripcion: '', imagen: '', link: '' });
    };

    const iniciarEdicion = (cat) => setCategoriaEditando({ ...cat });

    const guardarEdicion = () => {
        setCategorias(categorias.map(c => c.id === categoriaEditando.id ? categoriaEditando : c));
        setCategoriaEditando(null);
    };

    const eliminarCategoria = (id) => {
        if (window.confirm('¿Eliminar esta categoría?')) {
            setCategorias(categorias.filter(c => c.id !== id));
        }
    };

    const FormAgregar = () => (
        <div className="card mb-4 p-3">
            <h5>Agregar Nueva Categoría</h5>
            <input type="text" placeholder="ID" value={nuevaCategoria.id} onChange={e => setNuevaCategoria({ ...nuevaCategoria, id: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="Nombre" value={nuevaCategoria.nombre} onChange={e => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })} className="form-control mb-2" />
            <textarea placeholder="Descripción" value={nuevaCategoria.descripcion} onChange={e => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="URL Imagen" value={nuevaCategoria.imagen} onChange={e => setNuevaCategoria({ ...nuevaCategoria, imagen: e.target.value })} className="form-control mb-2" />
            <input type="text" placeholder="Link" value={nuevaCategoria.link} onChange={e => setNuevaCategoria({ ...nuevaCategoria, link: e.target.value })} className="form-control mb-2" />
            <button onClick={agregarCategoria} className="btn btn-success">Agregar Categoría</button>
        </div>
    );

    const FormEditar = () => {
        if (!categoriaEditando) return null;
        return (
            <div className="card mb-4 p-3 border-warning">
                <h5>Editar Categoría: {categoriaEditando.nombre}</h5>
                <input type="text" placeholder="Nombre" value={categoriaEditando.nombre} onChange={e => setCategoriaEditando({ ...categoriaEditando, nombre: e.target.value })} className="form-control mb-2" />
                <textarea placeholder="Descripción" value={categoriaEditando.descripcion} onChange={e => setCategoriaEditando({ ...categoriaEditando, descripcion: e.target.value })} className="form-control mb-2" />
                <input type="text" placeholder="URL Imagen" value={categoriaEditando.imagen} onChange={e => setCategoriaEditando({ ...categoriaEditando, imagen: e.target.value })} className="form-control mb-2" />
                <input type="text" placeholder="Link" value={categoriaEditando.link} onChange={e => setCategoriaEditando({ ...categoriaEditando, link: e.target.value })} className="form-control mb-2" />
                <button onClick={guardarEdicion} className="btn btn-primary me-2">Guardar Cambios</button>
                <button onClick={() => setCategoriaEditando(null)} className="btn btn-secondary">Cancelar</button>
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
                    {categorias.map(c => (
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
            <FormAgregar />
            <FormEditar />
        </div>
    );
}

export default AdminCategorias;
