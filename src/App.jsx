
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/productos' element={<Productos />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;