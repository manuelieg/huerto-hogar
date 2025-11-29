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
    // Estado del usuario logueado (null si no hay nadie)
    const [usuario, setUsuario] = useState(null);
    const [estaAutenticado, setEstaAutenticado] = useState(false);

    // Al iniciar la app, verificar si hay un usuario guardado en localStorage
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario_huerto');
        if (usuarioGuardado) {
            try {
                const user = JSON.parse(usuarioGuardado);
                setUsuario(user);
                setEstaAutenticado(true);
            } catch (error) {
                console.error("Error al leer usuario del storage:", error);
                localStorage.removeItem('usuario_huerto');
            }
        }
    }, []);

    // Función de Login
    const iniciarSesion = async (email, password) => {
        try {
            const respuesta = await AuthService.login({ email, password });
            const usuarioData = respuesta.data;
            
            // Guardar en estado y en localStorage
            setUsuario(usuarioData);
            setEstaAutenticado(true);
            localStorage.setItem('usuario_huerto', JSON.stringify(usuarioData));
            
            return { success: true };
        } catch (error) {
            console.error("Error de login:", error);
            return { 
                success: false, 
                mensaje: error.response?.data || "Credenciales incorrectas" 
            };
        }
    };

    // Función de Registro
    const registrarse = async (datosUsuario) => {
        try {
            // El backend espera: { nombre, email, password, rol: "CLIENTE" }
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

    // Función de Logout
    const cerrarSesion = () => {
        setUsuario(null);
        setEstaAutenticado(false);
        localStorage.removeItem('usuario_huerto');
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
