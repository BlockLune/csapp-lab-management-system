import axios from 'axios';
import { setAuth, getAuth, removeAuth, getRouteFromRole } from './auth';

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

export function logout() {
    removeAuth();
    axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = '';
        return config;
    });
}

export async function checkStatus(roles: string[]) {
    const route = getRouteFromRole(roles);
    try {
        const response = await axiosInstance.get(`${route}/status`);
        if (response.status === 200 && response.data === 'OK') {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
}

export async function getStudentList() {
    try {
        const response = await axiosInstance.get('/teachers/students');
        return response.data.sort();
    } catch (e) {
        return null;
    }
}

export async function addStudent(studentId: string, rawPassword: string) {
    try {
        await axiosInstance.post('/teachers/students', { studentId, rawPassword });
        return true;
    } catch (e) {
        return false;
    }
}

export async function removeStudent(studentId: string) {
    try {
        await axiosInstance.delete(`/teachers/students/${studentId}`);
        return true;
    } catch (e) {
        return false;
    }
}

export async function updateStudent(studentId: string, rawPassword: string) {
    try {
        await axiosInstance.put(`/teachers/students/${studentId}`, { studentId, rawPassword });
        return true;
    } catch (e) {
        return false;
    }
}

export interface LabInfo {
    id: number;
    name: string;
    description: string;
}

export async function getLabList(): Promise<LabInfo[] | null> {
    try {
        const response = await axiosInstance.get('/public/labs');
        return response.data;
    } catch (e) {
        return null;
    }
}

export async function getLabInfo(labId: string): Promise<LabInfo | null> {
    try {
        const response = await axiosInstance.get(`/public/labs/${labId}`);
        return response.data;
    } catch (e) {
        return null;
    }
}

export async function getLabMaterials(labId: string){
    try {
        const response = await axiosInstance.get(`/public/labs/${labId}/materials`);
        return response.data;
    } catch (e) {
        return null;
    }
}