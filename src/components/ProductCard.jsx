import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto }) => {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price);
    };

    const handleAddToCart = () => {
        console.log(`Producto añadido al carrito: ${producto.nombre}`);
    };

    const imgSrc = producto.imagen || '/images/placeholder.png'; 

    return (
        <div className="col mb-4">
            <div className="product-item card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                
                {/* Contenedor fijo para la imagen */}
                <figure className="d-flex justify-content-center p-3" style={{ height: '200px', overflow: 'hidden' }}>
                    <Link to={`/productos/${producto.id}`} title={producto.nombre} className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <img 
                            src={imgSrc} 
                            alt={`Imagen de ${producto.nombre}`} 
                            className="img-fluid"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </Link>
                </figure>

                <div className="card-body d-flex flex-column text-center pt-0 px-3 pb-2">
                    <h3 className="fs-6 fw-bold mb-1 text-dark">{producto.nombre}</h3>
                    
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                        <span className="text-success fw-bolder fs-5">{formatPrice(producto.precio)}/Kg</span>
                        <span className={`badge border rounded-1 fw-normal px-1 fs-7 lh-1 ${producto.stock > 50 ? 'bg-success-subtle text-success border-success' : 'bg-warning-subtle text-warning border-warning'}`}>
                            Stock: {producto.stock}Kg
                        </span>
                    </div>

                    <p className="text-muted small flex-grow-1">
                        {producto.descripcion}
                    </p> 

                    <div className="button-area p-3 pt-0 mt-auto">
                        <div className="row g-1 justify-content-center">
                            <div className="col-3">
                                <input type="number" name="quantity" className="form-control form-control-sm border-dark-subtle input-number quantity text-center" defaultValue="1" min="1" />
                            </div>
                            
                            <div className="col-7">
                                <button onClick={handleAddToCart} className="btn btn-primary rounded-1 p-2 fs-7 btn-cart w-100 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-cart me-1"></i> Añadir
                                </button>
                            </div>
                            
                            <div className="col-2">
                                <Link to="#" className="btn btn-outline-danger rounded-1 p-2 fs-6 w-100">
                                    <i className="bi bi-heart"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;

