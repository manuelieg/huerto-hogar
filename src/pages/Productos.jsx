import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import instanciaAxios from '../services/AxiosConfig';
import ProductoService from '../services/ProductoService';
import ProductGrid from '../components/ProductGrid';

function Productos() {
    const ubicacion = useLocation();
    const parametros = new URLSearchParams(ubicacion.search);
    const categoriaID = parametros.get('categoria');

    const [productos, setProductos] = useState([]);
    const [infoCategoria, setInfoCategoria] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [orden, setOrden] = useState('defecto');

    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            try {
                let dataProductos;

                if (categoriaID) {
                    const res = await ProductoService.buscarPorPrefijo(categoriaID);
                    dataProductos = res.data;

                    try {
                        const resCat = await instanciaAxios.get(`/categorias/${categoriaID}`);
                        setInfoCategoria(resCat.data);
                    } catch (e) {
                        console.warn("No se pudo cargar info de categoría, usando default");
                        setInfoCategoria(null);
                    }
                } else {
                    const res = await ProductoService.obtenerTodos();
                    dataProductos = res.data;
                    setInfoCategoria(null);
                }

                setProductos(dataProductos);

            } catch (error) {
                console.error("Error cargando el catálogo:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [categoriaID]);


    const productosOrdenados = [...productos].sort((a, b) => {
        if (orden === 'menor') return a.precio - b.precio;
        if (orden === 'mayor') return b.precio - a.precio;
        return 0;
    });

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-50 mt-5">
                <div className="spinner-border text-success" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="animate__animated animate__fadeIn"> 
            
            <div className="position-relative bg-dark text-white mb-5" style={{ minHeight: "260px" }}>
                {infoCategoria?.imagen ? (
                    <div 
                        style={{
                            backgroundImage: `url(${infoCategoria.imagen})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.5,
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 1
                        }}
                    ></div>
                ) : (
                    <div 
                        style={{
                            background: 'linear-gradient(90deg, rgba(25,135,84,1) 0%, rgba(20,108,67,1) 100%)',
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            zIndex: 1
                        }}
                    ></div>
                )}
                
                <div className="container position-relative h-100 d-flex flex-column justify-content-center py-5" style={{ zIndex: 2 }}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none opacity-75">Inicio</Link></li>
                            <li className="breadcrumb-item active text-white" aria-current="page">Productos</li>
                        </ol>
                    </nav>
                    <h1 className="display-4 fw-bold">
                        {infoCategoria ? infoCategoria.nombre : "Nuestra Huerta"}
                    </h1>
                    <p className="lead w-75 d-none d-md-block">
                        {infoCategoria ? infoCategoria.descripcion : "Explora los productos más frescos, traídos directamente del campo a tu hogar."}
                    </p>
                </div>
            </div>

            <div className="container mb-5">
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                    <span className="text-muted">
                        Mostrando <strong>{productos.length}</strong> productos
                    </span>
                    
                    <div className="d-flex align-items-center">
                        <label className="me-2 small text-muted d-none d-sm-block">Ordenar por:</label>
                        <select 
                            className="form-select form-select-sm border-success text-success fw-bold" 
                            style={{width: '180px'}}
                            onChange={(e) => setOrden(e.target.value)}
                            value={orden}
                        >
                            <option value="defecto">Relevancia</option>
                            <option value="menor">Precio: Menor a Mayor</option>
                            <option value="mayor">Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </div>

                {productosOrdenados.length > 0 ? (
                    <ProductGrid productos={productosOrdenados} />
                ) : (
                    <div className="text-center py-5">
                        <div className="mb-3">
                            <i className="bi bi-basket display-1 text-muted"></i>
                        </div>
                        <h3 className="text-muted">No encontramos productos aquí.</h3>
                        <p>Intenta buscar en otra categoría o vuelve al inicio.</p>
                        <Link to="/" className="btn btn-outline-success mt-2">Volver al Inicio</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Productos;
