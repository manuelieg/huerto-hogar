import instanciaAxios from "./AxiosConfig";

const API_URL = '/ordenes';

class OrdenService {
    
    authHeader() {
        const userStr = localStorage.getItem('user');
        let user = null;
        
        try {
            user = JSON.parse(userStr);
        } catch (e) {
            console.error("Error al leer usuario del localStorage", e);
            return {};
        }

        if (user && user.token) {
            console.log("Enviando Token:", user.token.substring(0, 10) + "..."); 
            return { Authorization: 'Bearer ' + user.token };
        } else {
            console.warn("NO HAY TOKEN: El usuario no está logueado o el formato es incorrecto.");
            return {};
        }
    }

    crearOrden(ordenRequest) {
        console.log("Intentando crear orden con datos:", ordenRequest);
        return instanciaAxios.post(API_URL, ordenRequest, { headers: this.authHeader() });
    }

    obtenerMisOrdenes(usuarioId) {
        return instanciaAxios.get(`${API_URL}/usuario/${usuarioId}`, { headers: this.authHeader() });
    }
    
    obtenerTodasLasOrdenes() {
        return instanciaAxios.get(API_URL, { headers: this.authHeader() });
    }

    actualizarEstado(ordenId, nuevoEstado) {
        return instanciaAxios.patch(
            `${API_URL}/${ordenId}/estado`,
            { estado: nuevoEstado },
            { headers: this.authHeader() }
        );
    }
}

export default new OrdenService();