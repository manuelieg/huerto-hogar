import axios from 'axios';

const instanciaAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
});

instanciaAxios.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem("user");
        
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instanciaAxios;