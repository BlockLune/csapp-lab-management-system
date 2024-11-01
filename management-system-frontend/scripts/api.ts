import axios from 'axios';
import { setAuth } from './auth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export default axiosInstance;

export async function login(username: string, password: string) {
    try {
        const response = await axiosInstance.post('/auth/login', { username, password });
        if (response.status === 200) {
            setAuth(response.data);
            axiosInstance.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${response.data.token}`;
                return config;
            })
            return response.data;
        }
    } catch (e) {
        return null;
    }
}

export async function getStudentList() {
    try {
        const response = await axiosInstance.get('/teachers/students');
        return response.data;
    } catch (e) {
        return null;
    }
}