import axios from 'axios';

const API_URL = 'http://3.16.215.211:8080/api/blogs';

class BlogService {
    
    obtenerTodos() {
        return axios.get(API_URL);
    }

    obtenerPorId(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    crearBlog(blog) {
        return axios.post(API_URL, blog);
    }

    actualizarBlog(id, blog) {
        return axios.put(`${API_URL}/${id}`, blog);
    }

    eliminarBlog(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new BlogService();