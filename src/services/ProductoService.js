import axios from 'axios';

const API_URL = 'http://3.16.215.211:8080/api/productos';

class ProductoService {
    
    obtenerTodos() {
        return axios.get(API_URL);
    }

    obtenerPorId(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    buscarPorPrefijo(prefijo) {
        return axios.get(`${API_URL}/buscar?prefijo=${prefijo}`);
    }

    crearProducto(producto) {
        return axios.post(API_URL, producto);
    }

    actualizarProducto(id, producto) {
        return axios.put(`${API_URL}/${id}`, producto);
    }

    eliminarProducto(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new ProductoService();