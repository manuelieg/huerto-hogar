import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";
import ProductGrid from "../ProductGrid.jsx";

vi.mock("../CartaProducto.jsx", function () {
return {
    default: function MockCartaProducto({ producto }) {
    return <div data-testid="carta-producto-mock">{producto.nombre}</div>;
    },
};
});

describe("ProductGrid (Testing de Renderizado Condicional)", function () {
var productosSimulados = [
    { id: "p1", nombre: "Producto Falso 1" },
    { id: "p2", nombre: "Producto Falso 2" },
];

var agregarCarritoSimulado = vi.fn();

test("1. Renderiza los componentes CartaProducto cuando se le pasan productos", function () {
    render(
    <ProductGrid
        productos={productosSimulados}
        agregarAlCarrito={agregarCarritoSimulado}
    />
    );
    expect(screen.getByText("Producto Falso 1")).toBeInTheDocument();
    expect(screen.getByText("Producto Falso 2")).toBeInTheDocument();

    var cartasRenderizadas = screen.getAllByTestId("carta-producto-mock");
    expect(cartasRenderizadas.length).toBe(2);
});

test("2. Muestra un mensaje de advertencia si no se le pasan productos", function () {
    render(
    <ProductGrid productos={[]} agregarAlCarrito={agregarCarritoSimulado} />
    );
    var mensajeAdvertencia = screen.getByText(/No se encontraron productos/i);
    expect(mensajeAdvertencia).toBeInTheDocument();
    var cartasRenderizadas = screen.queryAllByTestId("carta-producto-mock");
    expect(cartasRenderizadas.length).toBe(0);
});
});
