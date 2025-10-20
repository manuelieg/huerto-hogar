import React, { useState, useEffect } from 'react';
import { productos as productosBase } from '../data/productos.js';


const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(precio);
};

function AdminProductos() {
    const [listaProductos, setListaProductos] = useState(() => {
        const guardado = localStorage.getItem("productos");
        return guardado ? JSON.parse(guardado) : productosBase;
    });

    const [nuevaEntrada, setNuevaEntrada] = useState({ 
        id:'', nombre:'', descripcion:'', categoria:'', precio:0, stock:0, imagen:'' 
    });
    const [entradaEditando, setEntradaEditando] = useState(null);

    useEffect(() => {
        localStorage.setItem("productos", JSON.stringify(listaProductos));
    }, [listaProductos]);

    const agregarProducto = () => {
        if (!nuevaEntrada.id || !nuevaEntrada.nombre) { 
            alert('ID y Nombre son obligatorios.'); 
            return; 
        }
        setListaProductos([...listaProductos, nuevaEntrada]);
        setNuevaEntrada({ id:'', nombre:'', descripcion:'', categoria:'', precio:0, stock:0, imagen:'' });
    }; 

    const eliminarProducto = (id) => { 
        if (window.confirm('¿Eliminar este producto?')) setListaProductos(listaProductos.filter(p => p.id !== id)); 
    };

    const iniciarEdicion = (producto) => setEntradaEditando({ ...producto });

    const guardarEdicion = () => { 
        setListaProductos(listaProductos.map(p => p.id === entradaEditando.id ? entradaEditando : p)); 
        setEntradaEditando(null); 
    };

    const productosCriticos = listaProductos.filter(p => p.stock < 50);

    const FormularioAgregar = () => (
        <div className="card mb-4 p-3">
            <h5>Agregar Nuevo Producto</h5>
            <input type="text" placeholder="ID" value={nuevaEntrada.id} onChange={e => setNuevaEntrada({...nuevaEntrada, id:e.target.value})} className="form-control mb-2"/>
            <input type="text" placeholder="Nombre" value={nuevaEntrada.nombre} onChange={e => setNuevaEntrada({...nuevaEntrada, nombre:e.target.value})} className="form-control mb-2"/>
            <input type="text" placeholder="Categoría" value={nuevaEntrada.categoria} onChange={e => setNuevaEntrada({...nuevaEntrada, categoria:e.target.value})} className="form-control mb-2"/>
            <textarea placeholder="Descripción" value={nuevaEntrada.descripcion} onChange={e => setNuevaEntrada({...nuevaEntrada, descripcion:e.target.value})} className="form-control mb-2"/>
            <div className="d-flex gap-2 mb-2">
                <input type="number" placeholder="Precio" value={nuevaEntrada.precio} onChange={e => setNuevaEntrada({...nuevaEntrada, precio:Number(e.target.value)})} className="form-control"/>
                <input type="number" placeholder="Stock" value={nuevaEntrada.stock} onChange={e => setNuevaEntrada({...nuevaEntrada, stock:Number(e.target.value)})} className="form-control"/>
            </div>
            <input type="text" placeholder="URL Imagen" value={nuevaEntrada.imagen} onChange={e => setNuevaEntrada({...nuevaEntrada, imagen:e.target.value})} className="form-control mb-2"/>
            <button onClick={agregarProducto} className="btn btn-success">Agregar Producto</button>
        </div>
    );

    const FormularioEditar = () => {
        if (!entradaEditando) return null;
        return (
            <div className="card mb-4 p-3 border-warning">
                <h5>Editar Producto: {entradaEditando.nombre}</h5>
                <input type="text" placeholder="Nombre" value={entradaEditando.nombre} onChange={e => setEntradaEditando({...entradaEditando, nombre:e.target.value})} className="form-control mb-2"/>
                <input type="text" placeholder="Categoría" value={entradaEditando.categoria} onChange={e => setEntradaEditando({...entradaEditando, categoria:e.target.value})} className="form-control mb-2"/>
                <textarea placeholder="Descripción" value={entradaEditando.descripcion} onChange={e => setEntradaEditando({...entradaEditando, descripcion:e.target.value})} className="form-control mb-2"/>
                <div className="d-flex gap-2 mb-2">
                    <input type="number" placeholder="Precio" value={entradaEditando.precio} onChange={e => setEntradaEditando({...entradaEditando, precio:Number(e.target.value)})} className="form-control"/>
                    <input type="number" placeholder="Stock" value={entradaEditando.stock} onChange={e => setEntradaEditando({...entradaEditando, stock:Number(e.target.value)})} className="form-control"/>
                </div>
                <input type="text" placeholder="URL Imagen" value={entradaEditando.imagen} onChange={e => setEntradaEditando({...entradaEditando, imagen:e.target.value})} className="form-control mb-2"/>
                <button onClick={guardarEdicion} className="btn btn-primary me-2">Guardar Cambios</button>
                <button onClick={()=>setEntradaEditando(null)} className="btn btn-secondary">Cancelar</button>
            </div>
        );
    };

    const ListadoEntradas = () => (
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
                    {/* ⬅️ Uso de la variable traducida */}
                    {listaProductos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>{p.categoria}</td>
                            <td>{p.stock}</td>
                            <td>{formatearPrecio(p.precio)}</td>
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

    const ProductosBajoStock = () => (
        <div className="card mb-4 p-3 border-danger">
            <h5>Productos Críticos (Stock {"<"} 50)</h5>
            {productosCriticos.length === 0 
                ? <p>No hay productos críticos.</p> 
                : <ul>{productosCriticos.map(p => <li key={p.id}>{p.nombre} - Stock: {p.stock}</li>)}</ul>
            }
        </div>
    );

const PanelReportes = () => {
    const totalProductos = listaProductos.length;
    const stockTotal = listaProductos.reduce((acc,p)=>acc+p.stock,0);
    const precioPromedio = totalProductos ? listaProductos.reduce((acc,p)=>acc+p.precio,0)/totalProductos : 0;

        return (
            <div className="card mb-4 p-3 border-info">
                <h5>Reportes</h5>
                <p>Total productos: {totalProductos}</p>
                <p>Stock total: {stockTotal}</p>
                <p>Precio promedio: {formatearPrecio(precioPromedio)}</p>
            </div>
        );
    };

return (
    <div className="container mt-4">
    <h2 className="mb-4">Administración de Productos</h2>
    <ListadoEntradas />
    <FormularioAgregar />
    <FormularioEditar />
    <ProductosBajoStock />
    <PanelReportes />
     </div>
);
}

export default AdminProductos;
