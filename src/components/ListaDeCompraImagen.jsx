import React, { useState, useRef, useEffect } from "react";

function ListaDeCompraImagen({ items, imagenFondoUrl }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const canvasRef = useRef(null);
  const [imagenCargada, setImagenCargada] = useState(false);

  useEffect(() => {
    if (modalAbierto && canvasRef.current && imagenFondoUrl) {
      const img = new Image();
      img.src = imagenFondoUrl;

      img.onload = function () {
        setImagenCargada(true);
        dibujarEnCanvas(img);
      };

      img.onerror = function () {
        console.error("Error al cargar la imagen de fondo:", imagenFondoUrl);
        setImagenCargada(false);
      };
    }
    if (!modalAbierto) {
      setImagenCargada(false);
    }
  }, [modalAbierto, items, imagenFondoUrl]);

  function abrirModal() {
    setModalAbierto(true);
  }

  function cerrarModal() {
    setModalAbierto(false);
  }

  function dibujarEnCanvas(img) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = "#333";
    ctx.font = '36px "Arial"';
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    let startX = 220;
    let startY = 300;
    const lineHeight = 75;

    items.forEach((item, index) => {
      const texto = `- ${item.product.nombre} (x${item.quantity})`;
      ctx.fillText(texto, startX, startY + index * lineHeight);
    });
  }

  function descargarImagen() {
    const canvas = canvasRef.current;
    if (!canvas || !imagenCargada) {
      alert("La imagen no se ha cargado completamente para descargar.");
      return;
    }
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "lista-de-compra.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div className="text-start mt-4">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={abrirModal}
        >
          <i className="bi bi-list-check me-2"></i>
          Generar Lista de Compra
        </button>
      </div>

      {modalAbierto && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tu Lista de la Compra</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cerrarModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                {!imagenCargada && <p>Cargando lista de compra...</p>}
                <canvas
                  ref={canvasRef}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    border: "1px solid #ddd",
                    display: imagenCargada ? "block" : "none",
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cerrarModal}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={descargarImagen}
                  disabled={!imagenCargada}
                >
                  <i className="bi bi-download me-2"></i>
                  Descargar Lista
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListaDeCompraImagen;
