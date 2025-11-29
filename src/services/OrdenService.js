import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ordenes';

class OrdenService {
    
    crearOrden(ordenRequest) {
        return axios.post(API_URL, ordenRequest);
    }

    obtenerMisOrdenes(usuarioId) {
        return axios.get(`${API_URL}/usuario/${usuarioId}`);
    }
}

export default new OrdenService();