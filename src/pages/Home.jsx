
import React from 'react';
import CarouselMain from '../components/Carousel.jsx';
import { getCarouselItems } from "../data/carouseldata.js"; 


const Home = () => {
    const datosCarrusel = getCarouselItems();
    console.log("DATOS CARGADOS Y FUNCIONALES:", datosCarrusel); 

    return (
        <div className="container mx-auto p-4">
           <CarouselMain imagenes={datosCarrusel} />
        </div>
    );
};

export default Home;