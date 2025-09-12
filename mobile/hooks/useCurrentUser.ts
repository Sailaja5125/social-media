// query to our api to get the current user 
// backend user routes /me
// to get data use useQuery 
// to update or post data use useMutation 
import { useQuery } from "@tanstack/react-query";
import { useApiClient, userApi } from "../utils/api";


export const useCurrentUser = ()=>{
    const api = useApiClient();

    const { data: currentUser , isLoading , error , refetch} = useQuery({
        queryKey:["authUser"],
        queryFn:()=>userApi.getCurrentUser(api),
        select:(response) => response.data.user
    });

    return {
        currentUser,
        isLoading,
        error,
        refetch
    }
}