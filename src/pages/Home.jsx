import React from 'react';
import CarouselMain from '../components/Carousel.jsx';
import Categorias from "./Categorias.jsx";
import { getCarouselItems } from "../data/carouseldata.js"; 
import { Link } from 'react-router-dom';

const Home = () => {
    const datosCarrusel = getCarouselItems();
    console.log("DATOS CARGADOS Y FUNCIONALES:", datosCarrusel); 

    return (
    <div className="container mx-auto p-4">
      <CarouselMain imagenes={datosCarrusel} />
      <Categorias />
    </div>
  );
};
export default Home;
