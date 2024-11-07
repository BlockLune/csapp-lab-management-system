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

export async function getStudentList(): Promise<string[] | null> {
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
        await axiosInstance.post('/teachers/students/unix', { studentId, rawPassword });
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

export async function uploadMaterial(labId: string, file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        await axiosInstance.post(`/teachers/labs/${labId}/materials`, formData);
        return true;
    } catch (e) {
        return false;
    }
}

export async function removeMaterial(labId: string, fileName: string) {
    try {
        await axiosInstance.delete(`/teachers/labs/${labId}/materials/${fileName}`);
        return true;
    } catch (e) {
        return false;
    }
}

function triggerDownload(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

export async function downloadMaterial(labId: string, fileName: string) {
    try {
        const response = await axiosInstance.get(`/public/labs/${labId}/materials/${fileName}`, { responseType: 'blob' });
        if (response.status !== 200) {
            throw new Error('Download failed');
        }
        const blob = new Blob([response.data]);
        triggerDownload(blob, fileName);
        return true;
    } catch (e) {
        return false;
    }
}

export async function downloadSolutionByTeacher(labId: string, studentId: string, fileName: string) {
    try {
        const response = await axiosInstance.get(`/teachers/labs/${labId}/solutions/${studentId}/${fileName}`, { responseType: 'blob' });
        if (response.status !== 200) {
            throw new Error('Download failed');
        }
        const blob = new Blob([response.data]);
        triggerDownload(blob, fileName);
        return true;
    } catch (e) {
        return false;
    }
}

export async function getLabSolutionsByTeacher(labId: string, studentId: string): Promise<string[] | null> {
    try {
        const response = await axiosInstance.get(`/teachers/labs/${labId}/solutions/${studentId}`);
        return response.data;
    } catch (e) {
        return null;
    }
}

export async function getLabSolutionsByStudent(labId: string): Promise<string[] | null> {
    try {
        const response = await axiosInstance.get(`/students/labs/${labId}/solutions`);
        return response.data;
    } catch (e) {
        return null;
    }
}

export async function uploadLabSolutionByStudent(labId: string, file: File) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        await axiosInstance.post(`/students/labs/${labId}/solutions`, formData);
        return true;
    } catch (e) {
        return false;
    }
}

export async function downloadSolutionByStudent(labId: string, fileName: string) {
    try {
        const response = await axiosInstance.get(`/students/labs/${labId}/solutions/${fileName}`, { responseType: 'blob' });
        if (response.status !== 200) {
            throw new Error('Download failed');
        }
        const blob = new Blob([response.data]);
        triggerDownload(blob, fileName);
        return true;
    } catch (e) {
        return false;
    }
}

export async function deleteSolutionByStudent(labId: string, fileName: string) {
    try {
        const response = await axiosInstance.delete(`/students/labs/${labId}/solutions/${fileName}`);
        if (response.status !== 200) {
            throw new Error(`Failed to delete ${fileName} of Lab ${labId}`);
        }
        return true;
    } catch (e) {
        return false;
    }
}
