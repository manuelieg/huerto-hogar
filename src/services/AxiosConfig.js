import axios from 'axios';

const instanciaAxios = axios.create({
    baseURL: 'http://3.16.215.211:8080/api',
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