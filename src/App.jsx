import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Categorias from "./pages/Categorias.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from './pages/DetalleProducto.jsx';
import Nosotros from "./pages/Nosotros.jsx";
import Admin from "./admin/Admin.jsx";
import Login from "./pages/Login.jsx"; 
import Registro from "./pages/Registro.jsx"; 
import Carrito from './pages/Carrito.jsx'; 
import Checkout from './pages/Checkout.jsx'; 
import PagoExito from './pages/PagoExito.jsx'; 
import PagoError from './pages/PagoError.jsx'; 

const ProtectedRoute = ({ element: Element, isAuthenticated }) => {
    return isAuthenticated ? <Element /> : <Navigate to="/login" replace />;
};

function App() {
    const [cartItems, setCartItems] = useState([]); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const location = useLocation();
    const hideNavRoutes = ['/admin'];
    const hideNav = hideNavRoutes.includes(location.pathname);

    const handleAddToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const exists = prevItems.find(item => item.product.id === product.id);
            if (exists) {
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { product, quantity }];
            }
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    };

    const handleFinalizePurchase = () => {
        setCartItems([]);
    };
    
    const handleLogin = (username, password) => {
        if (username === 'admin' && password === '123') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {!hideNav && <Header 
                            cartCount={cartItems.length} 
                            isAuthenticated={isAuthenticated} 
                            onLogout={handleLogout}
                         />}
            
            <main className="flex-grow-1 mt-5 pt-3"> 
                
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/productos' element={<Productos onAddToCart={handleAddToCart} />} /> 
                    <Route path='/categorias' element={<Categorias />} />
                    <Route path='/nosotros' element={<Nosotros />} />
                    <Route path="/productos/:id" element={<DetalleProducto onAddToCart={handleAddToCart} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} /> 
                    <Route path="/registro" element={<Registro />} />
                    <Route path='/carrito' element={<Carrito cartItems={cartItems} onRemove={handleRemoveFromCart} onUpdateQuantity={handleAddToCart} />} />
                    <Route path='/checkout' element={<Checkout cartItems={cartItems} onFinalizePurchase={handleFinalizePurchase} />} />
                    <Route path='/pago-correcto' element={<PagoExito />} />
                    <Route path='/pago-error' element={<PagoError />} />
                    <Route 
                        path="/admin" 
                        element={<ProtectedRoute 
                                    element={Admin} 
                                    isAuthenticated={isAuthenticated} 
                                />} 
                    />
                </Routes>
            </main>
            
            {!hideNav && <Footer />}
            
        </div>
    );
}

export default App;