import React, { useState, useEffect, useRef } from "react";
import ProductoService from "../services/ProductoService";


const formatearPrecio = (precio) =>
    new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
    }).format(precio);


function PanelReportes({ listaProductos }) {
    const totalProductos = listaProductos.length;
    const stockTotal = listaProductos.reduce((acc, p) => acc + p.stock, 0);
    const precioPromedio =
        totalProductos > 0
            ? listaProductos.reduce((acc, p) => acc + p.precio, 0) / totalProductos
            : 0;

    return (
        <div className="row mb-4 g-3">
            <div className="col-md-4">
                <div className="card border-0 shadow-sm border-start border-primary border-4">
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small">Total Productos</h6>
                        <h3 className="fw-bold text-primary">{totalProductos}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 shadow-sm border-start border-success border-4">
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small">Stock Global</h6>
                        <h3 className="fw-bold text-success">{stockTotal} u.</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-0 shadow-sm border-start border-info border-4">
                    <div className="card-body">
                        <h6 className="text-muted text-uppercase small">Precio Promedio</h6>
                        <h3 className="fw-bold text-info">{formatearPrecio(precioPromedio)}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListadoEntradas({ listaProductos, setEntradaEditando, eliminarProducto }) {
    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold text-dark">Inventario Actual</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light text-secondary small">
                        <tr>
                            <th className="ps-3">Producto</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th className="text-end pe-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProductos.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-muted">
                                    No hay productos registrados.
                                </td>
                            </tr>
                        ) : (
                            listaProductos.map((p) => (
                                <tr key={p.id}>
                                    <td className="ps-3">
                                        <div className="d-flex align-items-center">
                                            {p.imagen ? (
                                                <img 
                                                    src={p.imagen} 
                                                    alt={p.nombre} 
                                                    className="rounded me-3 border"
                                                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                                />
                                            ) : (
                                                <div className="rounded me-3 bg-light d-flex align-items-center justify-content-center border" style={{ width: "40px", height: "40px" }}>
                                                    <i className="bi bi-image text-muted"></i>
                                                </div>
                                            )}
                                            <div>
                                                <div className="fw-bold text-dark">{p.nombre}</div>
                                                <small className="text-muted">ID: {p.id}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="badge bg-light text-dark border">{p.categoria}</span></td>
                                    <td>
                                        <span className={`badge ${p.stock < 10 ? 'bg-danger' : p.stock < 50 ? 'bg-warning text-dark' : 'bg-success'}`}>
                                            {p.stock} u.
                                        </span>
                                    </td>
                                    <td className="fw-bold text-primary">{formatearPrecio(p.precio)}</td>
                                    <td className="text-end pe-3">
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => setEntradaEditando({ ...p, precio: String(p.precio), stock: String(p.stock) })}
                                            title="Editar"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => eliminarProducto(p.id)}
                                            title="Eliminar"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function FormularioProducto({ titulo, datos, setDatos, accion, textoBoton, colorBoton, cancelar }) {
    return (
        <div className={`card shadow-sm border-0 mb-4 border-top border-${colorBoton} border-4`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title fw-bold mb-0">{titulo}</h5>
                    {cancelar && (
                        <button className="btn btn-close" onClick={cancelar}></button>
                    )}
                </div>
                
                <div className="row g-2">
                    {/* ID Opcional */}
                    <div className="col-md-2">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="prodId"
                                placeholder="ID"
                                value={datos.id}
                                onChange={(e) => setDatos({ ...datos, id: e.target.value })}
                                disabled={!!cancelar}
                            />
                            <label htmlFor="prodId">ID (Auto)</label>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="prodNombre"
                                placeholder="Nombre"
                                value={datos.nombre}
                                onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                            />
                            <label htmlFor="prodNombre">Nombre Producto</label>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="prodCat"
                                placeholder="Categoría"
                                value={datos.categoria}
                                onChange={(e) => setDatos({ ...datos, categoria: e.target.value })}
                            />
                            <label htmlFor="prodCat">Categoría</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-floating">
                            <textarea
                                className="form-control"
                                id="prodDesc"
                                placeholder="Descripción"
                                style={{ height: "80px" }}
                                value={datos.descripcion}
                                onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
                            ></textarea>
                            <label htmlFor="prodDesc">Descripción detallada</label>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="prodPrecio"
                                placeholder="Precio"
                                value={datos.precio}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (/^\d*$/.test(v)) setDatos({ ...datos, precio: v });
                                }}
                            />
                            <label htmlFor="prodPrecio">Precio ($)</label>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="prodStock"
                                placeholder="Stock"
                                value={datos.stock}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (/^\d*$/.test(v)) setDatos({ ...datos, stock: v });
                                }}
                            />
                            <label htmlFor="prodStock">Stock Actual</label>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="prodImg"
                                placeholder="URL Imagen"
                                value={datos.imagen}
                                onChange={(e) => setDatos({ ...datos, imagen: e.target.value })}
                            />
                            <label htmlFor="prodImg">URL Imagen</label>
                        </div>
                    </div>
                </div>

                <div className="mt-3 text-end">
                    {cancelar && (
                        <button className="btn btn-light me-2" onClick={cancelar}>
                            Cancelar
                        </button>
                    )}
                    <button className={`btn btn-${colorBoton} px-4`} onClick={accion}>
                        <i className={`bi bi-${cancelar ? 'check-lg' : 'plus-lg'} me-2`}></i>
                        {textoBoton}
                    </button>
                </div>
            </div>
        </div>
    );
}

function AdminProductos() {
    const [listaProductos, setListaProductos] = useState([]);
    const [nuevaEntrada, setNuevaEntrada] = useState({
        id: "", nombre: "", descripcion: "", categoria: "", precio: "", stock: "", imagen: "",
    });
    const [entradaEditando, setEntradaEditando] = useState(null);

    const editRef = useRef(null);
    const addRef = useRef(null);

    const cargarProductos = async () => {
        try {
            const res = await ProductoService.obtenerTodos();
            setListaProductos(res.data);
        } catch (err) {
            console.error("Error cargando productos", err);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const agregarProducto = async () => {
        if (!nuevaEntrada.nombre) return alert("El nombre es obligatorio");

        const body = {
            ...nuevaEntrada,
            precio: Number(nuevaEntrada.precio),
            stock: Number(nuevaEntrada.stock),
        };

        try {
            const res = await ProductoService.crearProducto(body);
            setListaProductos((prev) => [...prev, res.data]); 
            
            setNuevaEntrada({ id: "", nombre: "", descripcion: "", categoria: "", precio: "", stock: "", imagen: "" });
            alert("Producto creado con éxito");
        } catch (err) {
            console.error("Error agregando producto", err);
            alert("Error al crear el producto");
        }
    };

    const eliminarProducto = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este producto? Esta acción no se puede deshacer.")) return;

        try {
            await ProductoService.eliminarProducto(id);
            setListaProductos((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Error eliminando producto", err);
            alert("Error al eliminar");
        }
    };

    const guardarEdicion = async () => {
        const data = {
            ...entradaEditando,
            precio: Number(entradaEditando.precio),
            stock: Number(entradaEditando.stock),
        };

        try {
            const res = await ProductoService.actualizarProducto(data.id, data);
            const actualizado = res.data;

            setListaProductos((prev) =>
                prev.map((p) => (p.id === actualizado.id ? actualizado : p))
            );

            setEntradaEditando(null);
        } catch (err) {
            console.error("Error editando producto", err);
            alert("Error al actualizar");
        }
    };

    useEffect(() => {
        if (entradaEditando && editRef.current) {
            editRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [entradaEditando]);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4 fw-bold text-dark">📦 Gestión de Productos</h2>

            <PanelReportes listaProductos={listaProductos} />

            {entradaEditando && (
                <div ref={editRef}>
                    <FormularioProducto
                        titulo={`Editando: ${entradaEditando.nombre}`}
                        datos={entradaEditando}
                        setDatos={setEntradaEditando}
                        accion={guardarEdicion}
                        textoBoton="Guardar Cambios"
                        colorBoton="warning"
                        cancelar={() => setEntradaEditando(null)}
                    />
                </div>
            )}

            <ListadoEntradas
                listaProductos={listaProductos}
                setEntradaEditando={setEntradaEditando}
                eliminarProducto={eliminarProducto}
            />

            <div ref={addRef}>
                <FormularioProducto
                    titulo="Agregar Nuevo Producto"
                    datos={nuevaEntrada}
                    setDatos={setNuevaEntrada}
                    accion={agregarProducto}
                    textoBoton="Crear Producto"
                    colorBoton="success"
                />
            </div>
        </div>
    );
}

export default AdminProductos;