import React, { useState, useEffect } from 'react';
import { productos as productosIniciales } from '../data/productos.js';

export const FormatoPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(precio);
};

function AdminProductos() {
    const [productos, setProductos] = useState(() => {
        const guardado = localStorage.getItem("productos");
        return guardado ? JSON.parse(guardado) : productosIniciales;
    });

    const [nuevoProducto, setNuevoProducto] = useState({ 
        id:'', nombre:'', descripcion:'', categoria:'', precio:0, stock:0, imagen:'' 
    });
    const [productoEditando, setProductoEditando] = useState(null);

    useEffect(() => {
        localStorage.setItem("productos", JSON.stringify(productos));
    }, [productos]);

    const agregarProducto = () => {
        if (!nuevoProducto.id || !nuevoProducto.nombre) { 
            alert('ID y Nombre son obligatorios.'); 
            return; 
        }
        setProductos([...productos, nuevoProducto]);
        setNuevoProducto({ id:'', nombre:'', descripcion:'', categoria:'', precio:0, stock:0, imagen:'' });
    };

    const eliminarProducto = (id) => { 
        if (window.confirm('¿Eliminar este producto?')) setProductos(productos.filter(p => p.id !== id)); 
    };

    const iniciarEdicion = (producto) => setProductoEditando({ ...producto });

    const guardarEdicion = () => { 
        setProductos(productos.map(p => p.id === productoEditando.id ? productoEditando : p)); 
        setProductoEditando(null); 
    };

    const productosCriticos = productos.filter(p => p.stock < 50);

    const FormAgregar = () => (
        <div className="card mb-4 p-3">
            <h5>Agregar Nuevo Producto</h5>
            <input type="text" placeholder="ID" value={nuevoProducto.id} onChange={e => setNuevoProducto({...nuevoProducto, id:e.target.value})} className="form-control mb-2"/>
            <input type="text" placeholder="Nombre" value={nuevoProducto.nombre} onChange={e => setNuevoProducto({...nuevoProducto, nombre:e.target.value})} className="form-control mb-2"/>
            <input type="text" placeholder="Categoría" value={nuevoProducto.categoria} onChange={e => setNuevoProducto({...nuevoProducto, categoria:e.target.value})} className="form-control mb-2"/>
            <textarea placeholder="Descripción" value={nuevoProducto.descripcion} onChange={e => setNuevoProducto({...nuevoProducto, descripcion:e.target.value})} className="form-control mb-2"/>
            <div className="d-flex gap-2 mb-2">
                <input type="number" placeholder="Precio" value={nuevoProducto.precio} onChange={e => setNuevoProducto({...nuevoProducto, precio:Number(e.target.value)})} className="form-control"/>
                <input type="number" placeholder="Stock" value={nuevoProducto.stock} onChange={e => setNuevoProducto({...nuevoProducto, stock:Number(e.target.value)})} className="form-control"/>
            </div>
            <input type="text" placeholder="URL Imagen" value={nuevoProducto.imagen} onChange={e => setNuevoProducto({...nuevoProducto, imagen:e.target.value})} className="form-control mb-2"/>
            <button onClick={agregarProducto} className="btn btn-success">Agregar Producto</button>
        </div>
    );

    const FormEditar = () => {
        if (!productoEditando) return null;
        return (
            <div className="card mb-4 p-3 border-warning">
                <h5>Editar Producto: {productoEditando.nombre}</h5>
                <input type="text" placeholder="Nombre" value={productoEditando.nombre} onChange={e => setProductoEditando({...productoEditando, nombre:e.target.value})} className="form-control mb-2"/>
                <input type="text" placeholder="Categoría" value={productoEditando.categoria} onChange={e => setProductoEditando({...productoEditando, categoria:e.target.value})} className="form-control mb-2"/>
                <textarea placeholder="Descripción" value={productoEditando.descripcion} onChange={e => setProductoEditando({...productoEditando, descripcion:e.target.value})} className="form-control mb-2"/>
                <div className="d-flex gap-2 mb-2">
                    <input type="number" placeholder="Precio" value={productoEditando.precio} onChange={e => setProductoEditando({...productoEditando, precio:Number(e.target.value)})} className="form-control"/>
                    <input type="number" placeholder="Stock" value={productoEditando.stock} onChange={e => setProductoEditando({...productoEditando, stock:Number(e.target.value)})} className="form-control"/>
                </div>
                <input type="text" placeholder="URL Imagen" value={productoEditando.imagen} onChange={e => setProductoEditando({...productoEditando, imagen:e.target.value})} className="form-control mb-2"/>
                <button onClick={guardarEdicion} className="btn btn-primary me-2">Guardar Cambios</button>
                <button onClick={()=>setProductoEditando(null)} className="btn btn-secondary">Cancelar</button>
            </div>
        );
    };

    const ListadoProductos = () => (
        <div className="card mb-4 p-3">
            <h5>Listado de Productos</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>{p.categoria}</td>
                            <td>{p.stock}</td>
                            <td>{FormatoPrecio(p.precio)}</td>
                            <td>
                                <button onClick={()=>iniciarEdicion(p)} className="btn btn-sm btn-warning me-2">Editar</button>
                                <button onClick={()=>eliminarProducto(p.id)} className="btn btn-sm btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const ProductosCriticos = () => (
        <div className="card mb-4 p-3 border-danger">
            <h5>Productos Críticos (Stock {"<"} 50)</h5>
            {productosCriticos.length === 0 
                ? <p>No hay productos críticos.</p> 
                : <ul>{productosCriticos.map(p => <li key={p.id}>{p.nombre} - Stock: {p.stock}</li>)}</ul>
            }
        </div>
    );

    const Reportes = () => {
        const totalProductos = productos.length;
        const stockTotal = productos.reduce((acc,p)=>acc+p.stock,0);
        const precioPromedio = totalProductos ? productos.reduce((acc,p)=>acc+p.precio,0)/totalProductos : 0;

        return (
            <div className="card mb-4 p-3 border-info">
                <h5>Reportes</h5>
                <p>Total productos: {totalProductos}</p>
                <p>Stock total: {stockTotal}</p>
                <p>Precio promedio: {FormatoPrecio(precioPromedio)}</p>
            </div>
        );
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Productos</h2>
            <FormAgregar />
            <FormEditar />
            <ListadoProductos />
            <ProductosCriticos />
            <Reportes />
        </div>
    );
}

export default AdminProductos;
