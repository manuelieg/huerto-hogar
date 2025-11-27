import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Carrito from "../../pages/Carrito.jsx";

vi.mock("../../context/GestionCarrito.jsx", function () {
return {
    usarCarrito: vi.fn(),
};
});

vi.mock("../../data/productos.js", function () {
return {
    getAllProducts: vi.fn(() => []),
};
});

vi.mock("../ListaDeCompraImagen.jsx", function () {
return {
    default: function MockListaCompra() {
    return <div data-testid="lista-compra-mock"></div>;
    },
};
});

import { usarCarrito } from "../../context/GestionCarrito.jsx";
import { getAllProducts } from "../../data/productos.js";

function WrapperCarrito() {
return (
    <MemoryRouter>
    <Carrito /> 
    </MemoryRouter>
);
}

// --- Tests ---
describe("Carrito (Testing de Lógica y Renderizado)", function () {
var mockAgregarAlCarrito = vi.fn();
var mockEliminarDelCarrito = vi.fn();
var mockProductos = [
    { id: "p1", nombre: "Producto 1", precio: 1000, stock: 10 },
    { id: "p2", nombre: "Producto 2", precio: 500, stock: 5 },
];

beforeEach(function () {
    vi.clearAllMocks();
    getAllProducts.mockReturnValue(mockProductos);
    usarCarrito.mockReturnValue({
    articulosCarrito: [
        { product: mockProductos[0], quantity: 2 },
        { product: mockProductos[1], quantity: 1 },
    ],
    agregarAlCarrito: mockAgregarAlCarrito,
    eliminarDelCarrito: mockEliminarDelCarrito,
    });
});

test('1. Muestra "carrito vacío" si no hay artículos', function () {
    usarCarrito.mockReturnValue({
    articulosCarrito: [],
    agregarAlCarrito: mockAgregarAlCarrito,
    eliminarDelCarrito: mockEliminarDelCarrito,
    });

    render(<WrapperCarrito />);

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    expect(
    screen.getByRole("link", { name: /Ver Productos/i })
    ).toBeInTheDocument();
});

test("2. Calcula y muestra el total correctamente", function () {
    render(<WrapperCarrito />);
    var subtotalSpan = screen.getByText("Subtotal:").nextElementSibling;
    expect(subtotalSpan).toHaveTextContent("$2.500");

    var totalSpan = screen.getByText("Total a Pagar:").nextElementSibling;
    expect(totalSpan).toHaveTextContent("$2.500");
});

test("3. Llama a eliminarDelCarrito si la cantidad se cambia a 0", function () {
    render(<WrapperCarrito />);

    var inputs = screen.getAllByRole("spinbutton");
    var primerInput = inputs[0];

    fireEvent.change(primerInput, { target: { value: "0" } });

    expect(mockEliminarDelCarrito).toHaveBeenCalledTimes(1);
    expect(mockEliminarDelCarrito).toHaveBeenCalledWith("p1");
    expect(mockAgregarAlCarrito).not.toHaveBeenCalled();
});
});
