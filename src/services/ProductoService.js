import instanciaAxios from './AxiosConfig';

const API_URL = '/productos';

class ProductoService {
    
    obtenerTodos() {
        return instanciaAxios.get(API_URL);
    }

    obtenerPorId(id) {
        return instanciaAxios.get(`${API_URL}/${id}`);
    }

    buscarPorPrefijo(prefijo) {
        return instanciaAxios.get(`${API_URL}/buscar?prefijo=${prefijo}`);
    }

    crearProducto(producto) {
        return instanciaAxios.post(API_URL, producto);
    }

    actualizarProducto(id, producto) {
        return instanciaAxios.put(`${API_URL}/${id}`, producto);
    }

    eliminarProducto(id) {
        return instanciaAxios.delete(`${API_URL}/${id}`);
    }
}

export default new ProductoService();