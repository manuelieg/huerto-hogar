import React, { createContext, useContext, useState } from 'react';

const AlmacenCarrito = createContext(undefined);

export const usarCarrito = () => {
    const store = useContext(AlmacenCarrito);
    if (store === undefined) {
        throw new Error('usarCarrito debe usarse dentro de un GestionCarritoProvider');
    }
    return store;
};


export const GestionCarritoProvider = ({ children }) => {
    const [articulosCarrito, setArticulosCarrito] = useState([]);
    
    const agregarAlCarrito = (producto, cantidad = 1) => {
        setArticulosCarrito(prevItems => {
            const existe = prevItems.find(item => item.product.id === producto.id);
            if (existe) {
                let nuevaCantidad = existe.quantity + cantidad;
                if (nuevaCantidad <= 0) {
                     return prevItems.filter(item => item.product.id !== producto.id);
                }
                return prevItems.map(item =>
                    item.product.id === producto.id
                        ? { ...item, quantity: nuevaCantidad }
                        : item
                );
            } else {
                if (cantidad > 0) {
                    return [...prevItems, { product: producto, quantity: cantidad }];
                }
                return prevItems;
            }
        });
    };

    const eliminarDelCarrito = (productoId) => {
        setArticulosCarrito(prevItems => prevItems.filter(item => item.product.id !== productoId));
    };
    
    const finalizarCompra = () => {
        setArticulosCarrito([]);
    };

    const valorAlmacen = {
        articulosCarrito,
        conteoArticulos: articulosCarrito.length,
        
        agregarAlCarrito,
        eliminarDelCarrito,
        finalizarCompra,
    };

    return (
        <AlmacenCarrito.Provider value={valorAlmacen}>
            {children}
        </AlmacenCarrito.Provider>
    );
};