import React, { createContext, useContext, useState } from 'react';

const AuthStore = createContext(undefined);

export const useAuth = () => {
    const store = useContext(AuthStore);
    if (store === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthManagerProvider');
    }
    return store;
};


export const AuthManagerProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (username, password) => {
        if (username === 'admin' && password === '123') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const storeValue = {
        isAuthenticated,
        handleLogin,
        handleLogout,
    };

    return (
        <AuthStore.Provider value={storeValue}>
            {children}
        </AuthStore.Provider>
    );
};
