import axios from 'axios';

const instanciaAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
});

instanciaAxios.interceptors.request.use(
    (config) => {
        console.log("1. Interceptor activado para:", config.url);

        const token = localStorage.getItem('token'); 

        console.log("2. Token encontrado en LocalStorage:", token ? "SÍ, ES: " + token.substring(0, 10) + "..." : "NO HAY TOKEN (NULL)");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(" 3. Cabecera Authorization agregada exitosamente.");
        } else {
            console.warn("3. ALERTA: No se agregó cabecera porque no hay token.");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instanciaAxios;