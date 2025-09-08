import { useClerk } from "@clerk/clerk-expo";
import { Alert } from "react-native";

export const useSignOut = ()=>{
    const { signOut } = useClerk();

    const handleSignOut = async()=>{
        try {
            
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
        } catch (error) {
            console.log("error abc occoured here !!!"+error)
        }
    }
    return { handleSignOut }
}