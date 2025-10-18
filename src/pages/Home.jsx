import React from 'react';
import CarouselMain from '../components/Carousel.jsx';
import { getCarouselItems } from "../data/carouseldata.js"; 
import { Link } from 'react-router-dom';

const categorias = [
  { id: "FR", nombre: "Frutas Frescas", link: "/productos?categoria=FR", imagen: "/images/frutas.jpg" },
  { id: "VR", nombre: "Verduras Orgánicas", link: "/productos?categoria=VR", imagen: "/images/verduras.jpg" },
  { id: "PO", nombre: "Productos Orgánicos", link: "/productos?categoria=PO", imagen: "/images/productos.jpg" },
  { id: "PL", nombre: "Productos Lácteos", link: "/productos?categoria=PL", imagen: "/images/lacteos.jpg" },
];

const Home = () => {
    const datosCarrusel = getCarouselItems();
    console.log("DATOS CARGADOS Y FUNCIONALES:", datosCarrusel); 

    return (
        <div className="container mx-auto p-4">
            {/* Carrusel */}
            <CarouselMain imagenes={datosCarrusel} />

            {/* Categorías */}
            <div className="my-5">
                <h2 className="text-center mb-4">Categorías</h2>
                <div className="row">
                    {categorias.map(cat => (
                        <div key={cat.id} className="col-6 col-md-3 mb-4">
                            <Link to={cat.link} className="text-decoration-none">
                                <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                                    <div style={{ height: '150px', overflow: 'hidden' }}>
                                        {cat.imagen ? (
                                            <img 
                                                src={cat.imagen} 
                                                alt={cat.nombre} 
                                                className="img-fluid w-100 h-100"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div className="bg-secondary text-white d-flex justify-content-center align-items-center w-100 h-100">
                                                Sin imagen
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="fw-bold text-dark">{cat.nombre}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
