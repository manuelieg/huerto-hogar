import React from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CarritoManagerProvider, useCarrito } from './context/CarritoManager.jsx'; 
import { AuthManagerProvider, useAuth } from './context/AuthManager.jsx'; 
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Categorias from "./pages/Categorias.jsx";
import Productos from "./pages/Productos.jsx";
import DetalleProducto from './pages/DetalleProducto.jsx';
import Nosotros from "./pages/Nosotros.jsx"; 
import Login from "./pages/Login.jsx"; 
import Registro from "./pages/Registro.jsx"; 
import Carrito from './pages/Carrito.jsx'; 
import Checkout from './pages/Checkout.jsx'; 
import PagoExito from './pages/PagoExito.jsx'; 
import PagoError from './pages/PagoError.jsx'; 
import Blog from './pages/Blog.jsx'; 
import DetalleBlog from './pages/DetalleBlog.jsx'; 
import Admin from "./admin/Admin.jsx";
import AdminProductos from './admin/AdminProductos.jsx';
import AdminCategorias from './admin/AdminCategorias.jsx';
import AdminUsuarios from './admin/AdminUsuarios.jsx';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
};

const AppRoutes = () => {
    const { cartCount } = useCarrito(); 
    const { isAuthenticated, handleLogout } = useAuth(); 
    const location = useLocation();

    const hideNavRoutes = ['/admin', '/admin/productos', '/admin/categorias', '/admin/ordenes', '/admin/usuarios', '/admin/reportes'];
    const hideNav = hideNavRoutes.includes(location.pathname);

    return (
        <div className="d-flex flex-column min-vh-100">
            {!hideNav && (
                <Header 
                    cartCount={cartCount} 
                    isAuthenticated={isAuthenticated} 
                    onLogout={handleLogout}
                />
            )}

            <main className="flex-grow-1 mt-5 pt-3">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/productos' element={<Productos />} /> 
                    <Route path="/productos/:id" element={<DetalleProducto />} />
                    <Route path='/categorias' element={<Categorias />} />
                    <Route path='/nosotros' element={<Nosotros />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<DetalleBlog />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/registro" element={<Registro />} />
                    <Route path='/carrito' element={<Carrito />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/pago-correcto' element={<PagoExito />} />
                    <Route path='/pago-error' element={<PagoError />} />

                    <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                    <Route path="/admin/productos" element={<ProtectedRoute><Admin><AdminProductos /></Admin></ProtectedRoute>} />
                    <Route path="/admin/categorias" element={<ProtectedRoute><Admin><AdminCategorias /></Admin></ProtectedRoute>} />
                    <Route path="/admin/usuarios" element={<ProtectedRoute><Admin><AdminUsuarios /></Admin></ProtectedRoute>} />
                </Routes>
            </main>

            {!hideNav && <Footer />}
        </div>
    );
};

function App() {
    return (
        <AuthManagerProvider>
            <CarritoManagerProvider>
                <AppRoutes />
            </CarritoManagerProvider>
        </AuthManagerProvider>
    );
}

export default App;

