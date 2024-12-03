import axios from "axios"

const api = axios.create({
    baseURL: 'https://librardos-server.vercel.app', // Cambia al puerto de tu API
});

export default api;