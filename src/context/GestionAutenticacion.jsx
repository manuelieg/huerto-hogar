import React, { createContext, useContext, useState } from 'react';

const AlmacenAutenticacion = createContext(undefined);

export const usarAutenticacion = () => {
    const store = useContext(AlmacenAutenticacion);
    if (store === undefined) {
        throw new Error('usarAutenticacion debe usarse dentro de un GestionAutenticacionProvider');
    }
    return store;
};


export const GestionAutenticacionProvider = ({ children }) => {
    const [estaAutenticado, setEstaAutenticado] = useState(false);
    
    const iniciarSesion = (usuario, contrasena) => {
        if (usuario === 'admin' && contrasena === '123') {
            setEstaAutenticado(true);
            return true;
        }
        return false;
    };
    
    const cerrarSesion = () => {
        setEstaAutenticado(false);
    };

    const valorAlmacen = {
        estaAutenticado,
        iniciarSesion,
        cerrarSesion,
    };

    return (
        <AlmacenAutenticacion.Provider value={valorAlmacen}>
            {children}
        </AlmacenAutenticacion.Provider>
    );
};