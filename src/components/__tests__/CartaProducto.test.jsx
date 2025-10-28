import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import CartaProducto from "../CartaProducto.jsx";
import { usarCarrito } from "../../context/GestionCarrito.jsx";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../context/GestionCarrito.jsx", function () {
return {
    usarCarrito: vi.fn(),
};
});

function ComponenteWrapper(props) {
return (
    <BrowserRouter>
    <CartaProducto producto={props.producto} />
    </BrowserRouter>
);
}

describe("CartaProducto (Testing de Componente y Eventos)", function () {
var productoSimulado = {
    id: "FR001",
    nombre: "Manzana Fuji",
    precio: 1200,
    stock: 10,
    descripcion: "Manzanas frescas.",
    imagen: "/images/manzana.png",
};

var agregarAlCarritoSimulado = vi.fn();

beforeEach(function () {
    usarCarrito.mockReturnValue({
    agregarAlCarrito: agregarAlCarritoSimulado,
    });
    vi.clearAllMocks();
});

test("1. Renderiza nombre y stock correctamente", function () {
    render(<ComponenteWrapper producto={productoSimulado} />);

    expect(screen.getByText("Manzana Fuji")).toBeInTheDocument();
    expect(screen.getByText("Stock: 10Kg")).toBeInTheDocument();
});

test("2. Llama a agregarAlCarrito con la cantidad predeterminada (1)", function () {
    render(<ComponenteWrapper producto={productoSimulado} />);

    var botonAnadir = screen.getByText("Añadir");
    fireEvent.click(botonAnadir);

    expect(agregarAlCarritoSimulado).toHaveBeenCalledTimes(1);

    expect(agregarAlCarritoSimulado).toHaveBeenCalledWith(productoSimulado, 1);
});

test("3. Captura y usa la cantidad correcta del input", function () {
    render(<ComponenteWrapper producto={productoSimulado} />);

    var inputCantidad = screen.getByRole("spinbutton");

    fireEvent.change(inputCantidad, { target: { value: "5" } });

    var botonAnadir = screen.getByText("Añadir");
    fireEvent.click(botonAnadir);

    expect(agregarAlCarritoSimulado).toHaveBeenCalledWith(productoSimulado, 5);
});

test("4. Deshabilita el botón si el stock es cero", function () {
    var productoAgotado = { ...productoSimulado, stock: 0 };
    render(<ComponenteWrapper producto={productoAgotado} />);

    var botonAnadir = screen.getByText("Agotado");

    expect(botonAnadir).toBeDisabled();
    fireEvent.click(botonAnadir);

    expect(agregarAlCarritoSimulado).not.toHaveBeenCalled();
});

test('5. Muestra "¡Agregado!" y el mensaje de confirmación al hacer clic', async function () {
    render(<ComponenteWrapper producto={productoSimulado} />);
    var botonAnadir = screen.getByRole("button", { name: /Añadir/i });
    fireEvent.click(botonAnadir);
    var botonAgregado = await screen.findByText("¡Agregado!");
    expect(botonAgregado).toBeInTheDocument();
    expect(botonAgregado).toBeDisabled();
    var mensajeConfirmacion = await screen.findByText("Agregado al carrito");
    expect(mensajeConfirmacion).toBeInTheDocument();
});
});
