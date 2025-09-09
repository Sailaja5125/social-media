import axios , { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";

const API_BASE = "https://social-media-pngtfp6v8-sailajas-projects-c6560025.vercel.app/api/"

export const createApiClient = (getToken:()=>Promise<string|null>):AxiosInstance =>{
    const api = axios.create({
        baseURL:API_BASE,
    });

    api.interceptors.request.use(
        async (config)=>{
            const token = await getToken();
            console.log(token)
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
    );
    return api;
}

export const useApiClient = ():AxiosInstance=>{
    const { getToken } = useAuth();
    return createApiClient(getToken);
}

export const userApi = {
   syncUser: (api:AxiosInstance) => api.post('/users/sync'),
   getCurrentUser :(api:AxiosInstance) => api.post('/users/me'),
   updateProfile: (api:AxiosInstance , data:any) => api.post('/users/profile',data),
}