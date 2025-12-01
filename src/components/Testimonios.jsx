import React from "react";

function Testimonios() {
const reviews = [
    { id: 1, nombre: "María P.", texto: "Increíble la calidad de las verduras, llegaron súper frescas.", estrellas: "⭐⭐⭐⭐⭐" },
    { id: 2, nombre: "Juan C.", texto: "El despacho fue muy rápido, me salvó el almuerzo del domingo.", estrellas: "⭐⭐⭐⭐⭐" },
    { id: 3, nombre: "Fernanda L.", texto: "Me encanta que todo sea orgánico y apoyemos a locales.", estrellas: "⭐⭐⭐⭐" },
];

return (
    <section className="container my-5 pb-5">
    <h3 className="text-center fw-bold mb-4">Lo que dicen nuestros clientes 💚</h3>
    <div className="row g-4">
        {reviews.map((r) => (
        <div key={r.id} className="col-md-4">
            <div className="card text-center p-4 h-100 shadow-sm border-success bg-light">
            <div className="fs-3 mb-2">{r.estrellas}</div>
            <p className="fst-italic">"{r.texto}"</p>
            <h6 className="fw-bold mt-auto text-success">- {r.nombre}</h6>
            </div>
        </div>
        ))}
    </div>
    </section>
);
}

export default Testimonios;