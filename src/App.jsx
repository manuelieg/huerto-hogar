import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Categorias from "./pages/Categorias.jsx";
import Productos from "./pages/Productos.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Admin from "./admin/Admin.jsx";


function App() {
  const location = useLocation();

  const hideHeaderRoutes = ['/admin'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categorias' element={<Categorias />} />
        <Route path='/productos' element={<Productos />} />
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path="/admin" element={<Admin />} />
        
      </Routes>
      <Footer />
    </>
  );
}
export default App;