import axios from 'axios';
import { setAuth, getAuth } from './auth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config) => {
    const auth = getAuth();
    if (auth) {
        config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
})

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

export interface LabInfo {
    id: number;
    name: string;
    description: string;
}

export async function getLabList() {
    try {
        const response = await axiosInstance.get('/public/labs');
        return response.data;
    } catch (e) {
        return null;
    }
}