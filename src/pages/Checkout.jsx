import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { usarCarrito } from "../context/GestionCarrito.jsx";
import OrdenService from "../services/OrdenService.js";
import { usarAutenticacion } from "../context/GestionAutenticacion.jsx";


const Checkout = () => {
  const navigate = useNavigate();
  const { articulosCarrito, finalizarCompra, conteoArticulos } = usarCarrito();
  const { usuario } = usarAutenticacion();

  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    calle: "",
    region: "Región Metropolitana de Santiago",
    comuna: "",
    indicaciones: "",
  });

  const [stockError, setStockError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setDatosFormulario((prev) => ({
        ...prev,
        nombre: usuario.nombre || "",
        correo: usuario.email || "",
      }));
    }
  }, [usuario]);

  useEffect(() => {
    if (articulosCarrito.length === 0 && !procesando) {
    }
  }, [articulosCarrito, procesando, navigate]);

  const total = articulosCarrito.reduce(
    (acc, item) => acc + item.product.precio * item.quantity,
    0
  );

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setStockError(null);
    setFormError(null);

    if (
      !datosFormulario.nombre ||
      !datosFormulario.correo ||
      !datosFormulario.calle ||
      !datosFormulario.comuna
    ) {
      setFormError("Por favor, completa todos los campos obligatorios (*).");
      return;
    }

    setProcesando(true);

    const itemsParaBackend = articulosCarrito.map((item) => ({
      productoId: item.product.id,
      cantidad: item.quantity,
    }));

  const ordenRequest = {
      usuarioId: usuario ? usuario.id : 1, 
      items: itemsParaBackend,
    };

    try {
      const respuesta = await OrdenService.crearOrden(ordenRequest);
      console.log("Orden creada:", respuesta.data);
      
      const ordenGenerada = respuesta.data;

      finalizarCompra(); 
      
      navigate("/pago-correcto", { state: { orden: ordenGenerada } });

    } catch (error) {
      console.error("Error en la compra:", error);
      let mensajeError = "Error desconocido al procesar el pago.";
      
      if (error.response && error.response.data) {
          mensajeError = typeof error.response.data === 'string' 
              ? error.response.data 
              : JSON.stringify(error.response.data);
      }
      
      setStockError(mensajeError);
      navigate("/pago-error", { state: { error: mensajeError } });
      setProcesando(false);
    }
  };

  if (articulosCarrito.length === 0 && !procesando) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <i className="bi bi-info-circle display-4 text-muted"></i>
        <h2 className="mt-3">Tu carrito está vacío</h2>
        <Link to="/productos" className="btn btn-primary mt-3">
          Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="fw-bolder mb-4">Finalizar Compra</h1>

      {formError && (
        <div className="alert alert-warning mb-4 rounded-1">
          <strong>¡Error de formulario!</strong> {formError}
        </div>
      )}

      {stockError && (
        <div className="alert alert-danger mb-4 rounded-1">
          <strong>¡Atención!</strong> {stockError}
        </div>
      )}

      <form onSubmit={manejarEnvio}>
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 mb-4 p-4">
              <h4 className="border-bottom pb-2 mb-4">1. Información de Contacto</h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">Nombre *</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" value={datosFormulario.nombre} onChange={manejarCambio} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellidos" className="form-label">Apellidos</label>
                  <input type="text" className="form-control" id="apellidos" name="apellidos" value={datosFormulario.apellidos} onChange={manejarCambio} />
                </div>
                <div className="col-12">
                  <label htmlFor="correo" className="form-label">Correo Electrónico *</label>
                  <input type="email" className="form-control" id="correo" name="correo" value={datosFormulario.correo} onChange={manejarCambio} required />
                </div>
              </div>
              <h4 className="border-bottom pb-2 my-4">2. Dirección de Entrega</h4>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="calle" className="form-label">Calle y Número *</label>
                  <input type="text" className="form-control" id="calle" name="calle" value={datosFormulario.calle} onChange={manejarCambio} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="region" className="form-label">Región</label>
                  <select className="form-select" id="region" name="region" value={datosFormulario.region} onChange={manejarCambio}>
                    <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                    <option value="Valparaíso">Valparaíso</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="comuna" className="form-label">Comuna *</label>
                  <input type="text" className="form-control" id="comuna" name="comuna" value={datosFormulario.comuna} onChange={manejarCambio} required />
                </div>
                <div className="col-12">
                  <label htmlFor="indicaciones" className="form-label">Indicaciones (Opcional)</label>
                  <textarea className="form-control" id="indicaciones" name="indicaciones" rows="2" value={datosFormulario.indicaciones} onChange={manejarCambio}></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-lg border-0 sticky-top p-4" style={{ top: "80px" }}>
              <h4 className="card-title mb-4 border-bottom pb-2">Resumen y Pago</h4>
              <p className="fw-bold">Ítems ({conteoArticulos}):</p>
              <ul className="list-unstyled small mb-3">
                {articulosCarrito.map((item) => (
                  <li key={item.product.id} className="d-flex justify-content-between">
                    <span>{item.product.nombre} x {item.quantity}</span>
                    <span className="fw-bold">{formatearPrecio(item.product.precio * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between my-3 border-top pt-3">
                <span className="fw-bolder fs-5">Total a Pagar:</span>
                <span className="fw-bolder fs-4 text-success">{formatearPrecio(total)}</span>
              </div>
              
              <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={procesando}>
                {procesando ? (
                  <span><span className="spinner-border spinner-border-sm me-2"></span>Procesando...</span>
                ) : (
                  `Pagar Ahora ${formatearPrecio(total)}`
                )}
              </button>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;