import React, { createContext, useContext, useState } from 'react';

const CarritoStore = createContext(undefined);

export const useCarrito = () => {
    const store = useContext(CarritoStore);
    if (store === undefined) {
        throw new Error('useCarrito debe usarse dentro de un CarritoManagerProvider');
    }
    return store;
};


export const CarritoManagerProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const exists = prevItems.find(item => item.product.id === product.id);
            if (exists) {
                let newQuantity = exists.quantity + quantity;
                if (newQuantity <= 0) {
                     return prevItems.filter(item => item.product.id !== product.id);
                }
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            } else {
                if (quantity > 0) {
                    return [...prevItems, { product, quantity }];
                }
                return prevItems;
            }
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    };

    const handleFinalizePurchase = () => {
        setCartItems([]);
    };

    const storeValue = {
        cartItems,
        cartCount: cartItems.length,
        

        handleAddToCart,
        handleRemoveFromCart,
        handleFinalizePurchase,
    };

    return (
        <CarritoStore.Provider value={storeValue}>
            {children}
        </CarritoStore.Provider>
    );
};