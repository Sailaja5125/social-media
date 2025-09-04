import { View, Text, TouchableOpacity, Image, Button, Alert } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
export default function HomeScreen() {
  const { signOut } = useClerk();
  if(!signOut){
    Alert.alert("Some issue in signing out. Please try again.");
  }
  return (
    <View className="flex-1 justify-center items-center">
     <Text>Home page</Text>
      <Button onPress={() => signOut()} title="Sign Out" ></Button>
    </View>
  );
}