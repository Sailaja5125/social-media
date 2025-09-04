import React , { useState } from "react";
import { useSSO } from "@clerk/clerk-expo";
import { Alert } from "react-native";
export const useSocialAuth = () =>{
    // Add your social authentication logic here
    const [isLoading , setIsLoading] = useState(false);
    const { startSSOFlow } = useSSO();


    const handleSocialAuth = async(startergy:"oauth_google" | "oauth_apple")=>{
        setIsLoading(true);
        try {
            const { createdSessionId , setActive } = await startSSOFlow({ strategy: startergy });
            if(createdSessionId && setActive){
                await setActive({ session: createdSessionId });
            }
        } catch (error) {
            console.log("Social Auth Error: ", error);
            const provider = startergy === "oauth_google" ? "Google" : "Apple";
            Alert.alert(`Failed to sign in with ${provider}. Please try again.`);
        }finally{
            setIsLoading(false);
        }
    }
    return {isLoading , handleSocialAuth}
}