import axios from "axios"

const api = axios.create({
    baseURL: 'https://librardos-server.vercel.app',
});

export default api;