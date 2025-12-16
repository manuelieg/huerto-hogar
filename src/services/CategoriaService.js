import instanciaAxios from "./AxiosConfig";

const obtenerTodas = () => {
    return instanciaAxios.get("/categorias");
};

export default {
    obtenerTodas
};