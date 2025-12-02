import axios from 'axios';

const API_URL = 'http://18.217.238.198:8080/auth';

class AuthService {

    registrar(usuario) {
        return axios.post(`${API_URL}/registro`, usuario);
    }

    login(credenciales) {
        return axios.post(`${API_URL}/login`, credenciales);
    }
}

export default new AuthService();