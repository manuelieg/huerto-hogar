import React from "react";
import CarouselMain from "../components/Carousel.jsx";
import Categorias from "./Categorias.jsx";
import { getCarouselItems } from "../data/carouseldata.js";
import ProductosDestacados from "../components/ProductosDestacados";
import BannerServicios from "../components/BannerServicios";
import PromoBanner from "../components/PromoBanner";
import PreviewBlog from "../components/PreviewBlog";
import Testimonios from "../components/Testimonios";

const Home = () => {
  const datosCarrusel = getCarouselItems();

  return (
    <div className="home-container w-100 overflow-hidden">
      <section className="mb-4">
        <div className="container-fluid p-0">
          <CarouselMain imagenes={datosCarrusel} />
        </div>
      </section>

      <section className="container mb-5">
        <div className="p-4 bg-light rounded shadow-sm border">
          <BannerServicios />
        </div>
      </section>

      <section className="container mb-5">
        <div className="d-flex align-items-center mb-4 border-bottom pb-2">
          <h2 className="fw-bold m-0 text-dark">🔥 Lo más vendido</h2>
          <span className="ms-3 badge bg-warning text-dark">Top Semanal</span>
        </div>
        <ProductosDestacados />
      </section>

      <div className="mb-5">
        <PromoBanner />
      </div>

      <section className="container mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Explora nuestros pasillos</h2>
          <p className="text-muted">Todo lo que necesitas para tu despensa</p>
        </div>
        <Categorias />
      </section>

      <section className="container mb-5">
        <div className="d-flex align-items-center mb-4 border-bottom pb-2">
          <h2 className="fw-bold m-0 text-success">
            🌱 Quizás también te guste
          </h2>
        </div>
        <ProductosDestacados />
      </section>

      <section className="container py-5 border-top">
        <PreviewBlog />
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge bg-success mb-2">Comunidad</span>
          </div>
          <Testimonios />
        </div>
      </section>
    </div>
  );
};

export default Home;
