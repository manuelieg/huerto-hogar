import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ordenes';

class OrdenService {
    
    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return {};
        }
    }

    crearOrden(ordenRequest) {
        return axios.post(API_URL, ordenRequest, { headers: this.authHeader() });
    }

    obtenerMisOrdenes(usuarioId) {
        return axios.get(`${API_URL}/usuario/${usuarioId}`, { headers: this.authHeader() });
    }
}

export default new OrdenService();