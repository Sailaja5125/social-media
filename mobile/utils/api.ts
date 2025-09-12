import axios , { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";

const API_BASE = process.env.EXPO_PUBLIC_API_URL||"https://social-media-nine-kohl.vercel.app/api"

export const createApiClient = (getToken:()=>Promise<string|null>):AxiosInstance =>{
    const api = axios.create({
        baseURL:API_BASE,
    });

    api.interceptors.request.use(
        async (config)=>{
            const token = await getToken();
            // console.log(token)
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
   getCurrentUser :(api:AxiosInstance) => api.get('/users/me'),
   updateProfile: (api:AxiosInstance , data:any) => api.post('/users/profile',data),
}

export const postApi= {
    createPost :(api :AxiosInstance , data:{content:string ,image?:string})=> api.post("post/create"),
    getPosts : (api:AxiosInstance)=>api.get("post"),
    getUserPost:(api:AxiosInstance , username:string)=>api.post(`/post/user/${username}`),
    likPosts :(api:AxiosInstance , postId:string)=> api.post(`/post/${postId}/like`),
    deletePost:(api:AxiosInstance , postId:string)=> api.post(`/post/${postId}`),
}

export const commentApi={
    createComment: (api:AxiosInstance ,postId:string , content:string)=>api.post(`/comment/post/${postId}`,{content})
}