import instanciaAxios from "./AxiosConfig";

const API_URL = "/auth";

class AuthService {

    registrar(usuario) {
        return instanciaAxios.post(`${API_URL}/registro`, usuario);
    }

    login(credenciales) {
        return instanciaAxios
            .post(`${API_URL}/login`, credenciales)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    
                    localStorage.setItem("token", response.data.token); 
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();