import React, { useState, useEffect, useRef } from "react";

const API = "http://18.217.238.198:8080./api/productos";

const formatearPrecio = (precio) =>
    new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
    }).format(precio);

function ListadoEntradas({ listaProductos, setEntradaEditando, editRef, eliminarProducto }) {
    return (
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
                    {listaProductos.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>{p.categoria}</td>
                            <td>{p.stock}</td>
                            <td>{formatearPrecio(p.precio)}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => {
                                        setEntradaEditando({
                                            ...p,
                                            precio: String(p.precio),
                                            stock: String(p.stock),
                                        });
                                    }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => eliminarProducto(p.id)}
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

function FormularioAgregar({ nuevaEntrada, setNuevaEntrada, agregarProducto, addRef }) {
    return (
        <div ref={addRef} className="card mb-4 p-3">
            <h5>Agregar Nuevo Producto</h5>
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
                placeholder="Categoría"
                value={nuevaEntrada.categoria}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, categoria: e.target.value })}
            />
            <textarea
                className="form-control mb-2"
                placeholder="Descripción"
                value={nuevaEntrada.descripcion}
                onChange={(e) =>
                    setNuevaEntrada({ ...nuevaEntrada, descripcion: e.target.value })
                }
            />
            <div className="d-flex gap-2 mb-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Precio"
                    value={nuevaEntrada.precio}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (/^\d*$/.test(v))
                            setNuevaEntrada({ ...nuevaEntrada, precio: v });
                    }}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Stock"
                    value={nuevaEntrada.stock}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (/^\d*$/.test(v))
                            setNuevaEntrada({ ...nuevaEntrada, stock: v });
                    }}
                />
            </div>
            <input
                className="form-control mb-2"
                placeholder="URL Imagen"
                value={nuevaEntrada.imagen}
                onChange={(e) =>
                    setNuevaEntrada({ ...nuevaEntrada, imagen: e.target.value })
                }
            />
            <button className="btn btn-success" onClick={agregarProducto}>
                Agregar Producto
            </button>
        </div>
    );
}

function ProductosBajoStock({ productosCriticos }) {
    return (
        <div className="card mb-4 p-3 border-danger">
            <h5>Productos Críticos (Stock {"<"} 50)</h5>
            {productosCriticos.length === 0 ? (
                <p>No hay productos críticos.</p>
            ) : (
                <ul>
                    {productosCriticos.map((p) => (
                        <li key={p.id}>
                            {p.nombre} — Stock: {p.stock}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function PanelReportes({ listaProductos }) {
    const totalProductos = listaProductos.length;
    const stockTotal = listaProductos.reduce((acc, p) => acc + p.stock, 0);
    const precioPromedio =
        totalProductos > 0
            ? listaProductos.reduce((acc, p) => acc + p.precio, 0) / totalProductos
            : 0;

    return (
        <div className="card mb-4 p-3 border-info">
            <h5>Reportes</h5>
            <p>Total productos: {totalProductos}</p>
            <p>Stock total: {stockTotal}</p>
            <p>Precio promedio: {formatearPrecio(precioPromedio)}</p>
        </div>
    );
}

function FormularioEditar({ entradaEditando, setEntradaEditando, guardarEdicion, editRef }) {
    if (!entradaEditando) return null;

    return (
        <div ref={editRef} className="card mb-4 p-3 border-warning">
            <h5>Editar Producto: {entradaEditando.nombre}</h5>
            <input
                className="form-control mb-2"
                value={entradaEditando.nombre}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, nombre: e.target.value })
                }
            />
            <input
                className="form-control mb-2"
                value={entradaEditando.categoria}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, categoria: e.target.value })
                }
            />
            <textarea
                className="form-control mb-2"
                value={entradaEditando.descripcion}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, descripcion: e.target.value })
                }
            />
            <div className="d-flex gap-2 mb-2">
                <input
                    type="text"
                    className="form-control"
                    value={entradaEditando.precio}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (/^\d*$/.test(v))
                            setEntradaEditando({ ...entradaEditando, precio: v });
                    }}
                />
                <input
                    type="text"
                    className="form-control"
                    value={entradaEditando.stock}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (/^\d*$/.test(v))
                            setEntradaEditando({ ...entradaEditando, stock: v });
                    }}
                />
            </div>
            <input
                className="form-control mb-2"
                value={entradaEditando.imagen}
                onChange={(e) =>
                    setEntradaEditando({ ...entradaEditando, imagen: e.target.value })
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

function AdminProductos() {
    const [listaProductos, setListaProductos] = useState([]);
    const [nuevaEntrada, setNuevaEntrada] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        categoria: "",
        precio: "",
        stock: "",
        imagen: "",
    });
    const [entradaEditando, setEntradaEditando] = useState(null);

    const editRef = useRef(null);
    const addRef = useRef(null);

    const cargarProductos = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setListaProductos(data);
        } catch (err) {}
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const agregarProducto = async () => {
        if (!nuevaEntrada.id || !nuevaEntrada.nombre) return;

        const body = {
            ...nuevaEntrada,
            precio: Number(nuevaEntrada.precio),
            stock: Number(nuevaEntrada.stock),
        };

        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const creado = await res.json();
            setListaProductos((prev) => [...prev, creado]);

            setNuevaEntrada({
                id: "",
                nombre: "",
                descripcion: "",
                categoria: "",
                precio: "",
                stock: "",
                imagen: "",
            });
        } catch (err) {}
    };

    const eliminarProducto = async (id) => {
        if (!window.confirm("¿Eliminar este producto?")) return;

        await fetch(`${API}/${id}`, { method: "DELETE" });
        setListaProductos((prev) => prev.filter((p) => p.id !== id));
    };

    const guardarEdicion = async () => {
        const data = {
            ...entradaEditando,
            precio: Number(entradaEditando.precio),
            stock: Number(entradaEditando.stock),
        };

        try {
            const res = await fetch(`${API}/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const actualizado = await res.json();

            setListaProductos((prev) =>
                prev.map((p) => (p.id === actualizado.id ? actualizado : p))
            );

            setEntradaEditando(null);
        } catch (err) {}
    };

    const productosCriticos = listaProductos.filter((p) => p.stock < 50);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Administración de Productos</h2>

            <FormularioEditar
                entradaEditando={entradaEditando}
                setEntradaEditando={setEntradaEditando}
                guardarEdicion={guardarEdicion}
                editRef={editRef}
            />

            <ListadoEntradas
                listaProductos={listaProductos}
                setEntradaEditando={setEntradaEditando}
                eliminarProducto={eliminarProducto}
            />

            <FormularioAgregar
                nuevaEntrada={nuevaEntrada}
                setNuevaEntrada={setNuevaEntrada}
                agregarProducto={agregarProducto}
                addRef={addRef}
            />

            <ProductosBajoStock productosCriticos={productosCriticos} />
            <PanelReportes listaProductos={listaProductos} />
        </div>
    );
}

export default AdminProductos;
