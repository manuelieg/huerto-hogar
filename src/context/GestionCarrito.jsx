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
            })
            .catch((error) => {
                console.error("Error al conectar con la API:", error);
            });
    }, []);

    const agregarAlCarrito = (product, quantity = 1) => {
        setArticulosCarrito((prevItems) => {
            const itemExistente = prevItems.find((item) => item.product.id === product.id);
            const esPeso = product.unidadMedida === 'KG';

            if (itemExistente) {
                return prevItems.map((item) => {
                    if (item.product.id === product.id) {
                        let nuevaCantidad = item.quantity + quantity;

                        if (esPeso) {
                            nuevaCantidad = parseFloat(nuevaCantidad.toFixed(3));
                        } else {
                            nuevaCantidad = Math.round(nuevaCantidad);
                        }
                        
                        const stockMax = product.stock || 9999;
                        const cantidadFinal = nuevaCantidad > stockMax ? stockMax : nuevaCantidad;

                        return { ...item, quantity: cantidadFinal };
                    }
                    return item;
                });
            }

            let cantidadInicial = quantity;
            if (!esPeso) {
                cantidadInicial = Math.round(cantidadInicial);
            }

            return [...prevItems, { product, quantity: cantidadInicial }];
        });
    };

    const eliminarDelCarrito = (id) => {
        setArticulosCarrito((prevItems) => prevItems.filter((item) => item.product.id !== id));
    };

    const finalizarCompra = () => {
        setArticulosCarrito([]);
    };

    const conteoArticulos = articulosCarrito.length;

    const totalCarrito = articulosCarrito.reduce((acc, item) => {
        const subtotal = Math.round(item.product.precio * item.quantity);
        return acc + subtotal;
    }, 0);

    const valorDelAlmacen = {
        articulosCarrito,
        productosTienda,
        agregarAlCarrito,
        eliminarDelCarrito,
        finalizarCompra,
        conteoArticulos,
        totalCarrito,
    };

    return (
        <AlmacenCarrito.Provider value={valorDelAlmacen}>
            {children}
        </AlmacenCarrito.Provider>
    );
};