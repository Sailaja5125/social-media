import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient , userApi } from "@/utils/api";

// to avoid messy fetch apis we use useMutation form tanstack
export const useUserSync = () => {
    const {isSignedIn} = useAuth();
    const api = useApiClient();

    const syncUserMutation = useMutation({
        mutationFn: () => userApi.syncUser(api),
        onSuccess: (response:any)=> console.log("User synced successfully", response.data.user),
        onError: (error:any) => console.error("Sync User failed", error),
    });

    // auto-sync user when signed in
    useEffect(()=>{
        if(isSignedIn && !syncUserMutation.data){
            syncUserMutation.mutate();
        }
    },[isSignedIn]);

    return null;
}