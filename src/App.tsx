import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carousel from "./components/Footer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contacto from "./pages/Contacto";
import Productos from "./pages/Productos";
import About from "./pages/About";



function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/productos' element={<Productos />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route path='/about' element={<About />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
