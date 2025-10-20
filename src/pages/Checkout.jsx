import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoManager.jsx';
import { getAllProducts } from '../data/productos.js'; 

const Checkout = () => {
    const navigate = useNavigate();

    const { cartItems, handleFinalizePurchase } = useCarrito(); 

    const allProducts = getAllProducts();

    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        calle: '',
        region: 'Región Metropolitana de Santiago',
        comuna: '',
        indicaciones: ''
    });

    const [stockError, setStockError] = useState(null); 
    const [formError, setFormError] = useState(null); 

    const total = cartItems.reduce((acc, item) => 
        acc + (item.product.precio * item.quantity), 0
    );

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }).format(price);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setStockError(null); 
        setFormError(null); 
        
        if (cartItems.length === 0) {
            navigate('/productos');
            return;
        }

        if (!formData.nombre || !formData.correo || !formData.calle || !formData.comuna) {
            setFormError("Por favor, completa todos los campos obligatorios (*)."); 
            return;
        }

        let stockInvalido = null;
        for (const item of cartItems) {
            const productSource = allProducts.find(p => p.id === item.product.id);
            
            if (productSource && item.quantity > productSource.stock) {
                stockInvalido = item;
                break; 
            }
        }
        
        if (stockInvalido) {

            setStockError(`El producto "${stockInvalido.product.nombre}" excede el stock disponible (${stockInvalido.product.stock}kg).`);
            console.log("REDIRIGIENDO A ERROR POR STOCK...");
            navigate('/pago-error'); 
            return;
        }
        

        const pagoExitoso = true; 

        if (pagoExitoso) {
 
            handleFinalizePurchase(); 
            console.log("REDIRIGIENDO A ÉXITO...");
            navigate('/pago-correcto'); 
        } else {
            setStockError('Error desconocido en el proceso de pago.');
            navigate('/pago-error'); 
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5 pt-5 text-center">
                <i className="bi bi-info-circle display-4 text-muted"></i>
                <h2 className="mt-3">Tu carrito está vacío</h2>
                <p className="text-muted">No puedes procesar la compra sin productos.</p>
                <Link to="/productos" className="btn btn-primary mt-3">Volver a Productos</Link>
            </div>
        );
    }
    
    return (
        <div className="container my-5">
            <h1 className="fw-bolder mb-4">Finalizar Compra</h1>
            
            {formError && (
                <div className="alert alert-warning mb-4 rounded-1">
                    <strong>¡Error de formulario!</strong> {formError}
                </div>
            )}

            {stockError && (
                <div className="alert alert-danger mb-4 rounded-1">
                    <strong>¡Atención!</strong> {stockError} Por favor, ajusta tu carrito.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 mb-4 p-4">
                            <h4 className="border-bottom pb-2 mb-4">1. Información de Contacto</h4>
                            
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="nombre" className="form-label">Nombre *</label>
                                    <input type="text" className="form-control rounded-1" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                    <input type="text" className="form-control rounded-1" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="correo" className="form-label">Correo Electrónico *</label>
                                    <input type="email" className="form-control rounded-1" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
                                </div>
                            </div>
                            
                            <h4 className="border-bottom pb-2 my-4">2. Dirección de Entrega</h4>
                            
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="calle" className="form-label">Calle y Número *</label>
                                    <input type="text" className="form-control rounded-1" id="calle" name="calle" value={formData.calle} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="region" className="form-label">Región</label>
                                    <select className="form-select rounded-1" id="region" name="region" value={formData.region} onChange={handleChange}>
                                        <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                                        <option value="Valparaíso">Valparaíso</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="comuna" className="form-label">Comuna *</label>
                                    <input type="text" className="form-control rounded-1" id="comuna" name="comuna" value={formData.comuna} onChange={handleChange} required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="indicaciones" className="form-label">Indicaciones para la entrega (Opcional)</label>
                                    <textarea className="form-control rounded-1" id="indicaciones" name="indicaciones" rows="2" value={formData.indicaciones} onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card shadow-lg border-0 sticky-top p-4" style={{ top: '80px' }}>
                            <h4 className="card-title mb-4 border-bottom pb-2">Resumen y Pago</h4>
                            
                            <p className="fw-bold">Ítems ({cartItems.length}):</p>
                            <ul className="list-unstyled small mb-3">
                                {cartItems.map(item => (
                                    <li key={item.product.id} className="d-flex justify-content-between">
                                        <span>{item.product.nombre} x {item.quantity}</span>
                                        <span className="fw-bold">{formatPrice(item.product.precio * item.quantity)}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="d-flex justify-content-between my-3 border-top pt-3">
                                <span className="fw-bolder fs-5">Total a Pagar:</span>
                                <span className="fw-bolder fs-4 text-success">{formatPrice(total)}</span>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                                Pagar Ahora {formatPrice(total)}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;