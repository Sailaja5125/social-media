import { useClerk } from "@clerk/clerk-expo";
import { Alert } from "react-native";

export const useSignOut = ()=>{
    const { signOut } = useClerk();

    const handleSignOut = async()=>{
            
            Alert.alert("logout", "Are you sure you want to logout?", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async()=>signOut(),
                }
            ])
        
    }
    return { handleSignOut }
}