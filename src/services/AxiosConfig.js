import axios from 'axios';

const instanciaAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
});

export default instanciaAxios;