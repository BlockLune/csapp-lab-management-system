import axios from 'axios';
import { setAuth } from './auth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export default axiosInstance;

export async function login(username: string, password: string) {
    const response = await axiosInstance.post('/auth/login', { username, password });
    if (response.status === 200) {
        setAuth(response.data);

        axiosInstance.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${response.data.token}`;
            return config;
        })

        return response.data;
    }
    return null;
}