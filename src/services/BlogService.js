import instanciaAxios from "./AxiosConfig";

const API_URL = '/blogs';

class BlogService {
    
    obtenerTodos() {
        return instanciaAxios.get(API_URL);
    }

    obtenerPorId(id) {
        return instanciaAxios.get(`${API_URL}/${id}`);
    }

    crearBlog(blog) {
        return instanciaAxios.post(API_URL, blog);
    }

    actualizarBlog(id, blog) {
        return instanciaAxios.put(`${API_URL}/${id}`, blog);
    }

    eliminarBlog(id) {
        return instanciaAxios.delete(`${API_URL}/${id}`);
    }
}

export default new BlogService();