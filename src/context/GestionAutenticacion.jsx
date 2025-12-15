import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService.js';

const AuthContext = createContext(undefined);

export const usarAutenticacion = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('usarAutenticacion debe usarse dentro de un GestionAutenticacionProvider');
    }
    return context;
};

export const GestionAutenticacionProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(() => {
        return AuthService.getCurrentUser();
    });

    const [estaAutenticado, setEstaAutenticado] = useState(() => {
        return !!AuthService.getCurrentUser();
    });

    const iniciarSesion = async (email, password) => {
        try {
            const datosUsuario = await AuthService.login({ email, password });
            
            setUsuario(datosUsuario);
            setEstaAutenticado(true);
            
            return { success: true };
        } catch (error) {
            console.error("Error de login:", error);
            return { 
                success: false, 
                mensaje: error.response?.data?.message || "Credenciales incorrectas" 
            };
        }
    };

    const registrarse = async (datosUsuario) => {
        try {
            const usuarioParaEnviar = { ...datosUsuario, rol: "CLIENTE" };
            await AuthService.registrar(usuarioParaEnviar);
            return { success: true };
        } catch (error) {
            console.error("Error de registro:", error);
            return { 
                success: false, 
                mensaje: error.response?.data || "Error al registrar usuario" 
            };
        }
    };

    const cerrarSesion = () => {
        AuthService.logout();
        setUsuario(null);
        setEstaAutenticado(false);
    };

    const value = {
        usuario,
        estaAutenticado,
        iniciarSesion,
        registrarse,
        cerrarSesion
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};