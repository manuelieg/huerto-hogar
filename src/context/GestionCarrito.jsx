import React, { useState, useEffect, createContext, useContext } from 'react';
import ProductoService from '../services/ProductoService.js';

const AlmacenCarrito = createContext();

export const usarCarrito = () => {
const store = useContext(AlmacenCarrito);
if (!store) {
    throw new Error('usarCarrito debe usarse dentro de un GestionCarritoProvider');
}
return store;
};

export const GestionCarritoProvider = ({ children }) => {

const [articulosCarrito, setArticulosCarrito] = useState([]);

const [productosTienda, setProductosTienda] = useState([]);

useEffect(() => {
    ProductoService.obtenerTodos()
    .then((response) => {
        setProductosTienda(response.data);
        console.log("Productos cargados:", response.data);
    })
    .catch((error) => {
        console.error("Error al conectar con la API:", error);
    });
}, []);


const agregarAlCarrito = (product, quantity = 1) => {
    setArticulosCarrito((prevItems) => {
    const itemExistente = prevItems.find((item) => item.product.id === product.id);
    if (itemExistente) {
        return prevItems.map((item) =>
        item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
    }
    return [...prevItems, { product, quantity }];
    });
};

const eliminarDelCarrito = (id) => {
    setArticulosCarrito((prevItems) => prevItems.filter((item) => item.product.id !== id));
};

const finalizarCompra = () => {
    setArticulosCarrito([]);
};

const conteoArticulos = articulosCarrito.reduce((acc, item) => acc + item.quantity, 0);

const valorDelAlmacen = {
    articulosCarrito,
    productosTienda,
    agregarAlCarrito,
    eliminarDelCarrito,
    finalizarCompra,
    conteoArticulos,
};

return (
    <AlmacenCarrito.Provider value={valorDelAlmacen}>
    {children}
    </AlmacenCarrito.Provider>
);
};