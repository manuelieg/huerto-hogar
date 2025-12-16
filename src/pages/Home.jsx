import React from "react";
import { Link } from "react-router-dom";
import CarouselMain from "../components/Carousel.jsx";
import Categorias from "./Categorias.jsx";
import { getCarouselItems } from "../data/carouseldata.js";
import ProductosDestacados from "../components/ProductosDestacados";
import BannerServicios from "../components/BannerServicios";
import PromoBanner from "../components/PromoBanner";
import PreviewBlog from "../components/PreviewBlog";
import Testimonios from "../components/Testimonios";
import "../components/Home.css";

const Home = () => {
  const datosCarrusel = getCarouselItems();

  return (
    <div className="home-container w-100 overflow-hidden fade-in">
      
      <section className="hero-section mb-0">
        <div className="container-fluid p-0">
          <CarouselMain imagenes={datosCarrusel} />
        </div>
      </section>

      <section className="bg-white py-4 shadow-sm position-relative" style={{ zIndex: 10 }}>
        <div className="container">
          <BannerServicios /> 
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="badge bg-warning text-dark mb-2">🔥 Top Semanal</span>
            <h2 className="fw-bold display-6 mb-0 text-dark">Lo más vendido</h2>
            <p className="text-muted mb-0">Los favoritos de nuestra comunidad</p>
          </div>
          <Link to="/productos" className="btn btn-outline-dark rounded-pill px-4 d-none d-md-block">
            Ver todo <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
        
        <ProductosDestacados limit={4} />

        <div className="d-block d-md-none text-center mt-3">
            <Link to="/productos" className="btn btn-outline-dark w-100">Ver todo</Link>
        </div>
      </section>

      <div className="py-2">
        <PromoBanner />
      </div>

      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5 mw-760 mx-auto">
            <h2 className="fw-bold display-6">Explora nuestros pasillos</h2>
            <p className="lead text-muted fs-6">
              Desde frutas frescas hasta lácteos de campo. Todo lo que necesitas para tu despensa, directo a tu puerta.
            </p>
            <div className="divider-green mx-auto mt-3"></div>
          </div>
          <Categorias />
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex align-items-center mb-4 pb-2 border-bottom border-success border-opacity-25">
          <i className="bi bi-basket text-success fs-3 me-2"></i>
          <h2 className="fw-bold m-0 text-dark">
            Quizás también te guste
          </h2>
        </div>
        
        <ProductosDestacados limit={4} /> 
      </section>

      <section className="py-5 bg-white border-top">
        <div className="container">
            <h3 className="fw-bold mb-4 text-center">📝 Consejos del Huerto</h3>
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <PreviewBlog />
                </div>
            </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
            <div className="text-center mb-5">
                <i className="bi bi-chat-quote-fill text-success fs-1 opacity-25"></i>
                <h3 className="fw-bold mt-2">Lo que dicen de nosotros</h3>
            </div>
            
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Testimonios />
                </div>
            </div>
            
            <div className="text-center mt-4">
                <button className="btn btn-sm btn-link text-success text-decoration-none fw-bold">
                    Leer más reseñas
                </button>
            </div>
        </div>
      </section>

      <section className="bg-success py-5 text-white text-center">
        <div className="container">
            <h2 className="fw-bold">¿Listo para llenar tu despensa?</h2>
            <p className="mb-4 text-white-50">Haz tu primer pedido hoy!</p>
            <Link to="/productos" className="btn btn-light btn-lg rounded-pill fw-bold text-success px-5 shadow">
                Comprar Ahora
            </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
