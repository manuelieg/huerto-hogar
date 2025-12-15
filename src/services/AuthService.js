import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth";

class AuthService {

    registrar(usuario) {
        return axios.post(`${API_URL}/registro`, usuario);
    }

    login(credenciales) {
        return axios
            .post(`${API_URL}/login`, credenciales)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();