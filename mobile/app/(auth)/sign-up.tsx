import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSocialAuth } from "@/hooks/useSocialAuth";


export default function Index() {
  const handlesSocialAuth = useSocialAuth();
  return (
    <View className="flex-1 bg-white px-8 justify-center">
      {/* Logo or Illustration */}
        <Text className="text-3xl font-bold mt-6 text-[#5e35c3]">Welcome To Campus Connect</Text>
        <Text className="text-base text-[#273236] mt-2">
          Sign up to get started with your journey
        </Text>
      <View className="items-center">
        <Image
          source={require("../../assets/images/Socialmediaapp1.jpeg")} // ✅ Corrected here
          className="w-96 h-96"
        />
      </View>

      {/* Signup Buttons */}
      <View >
        <TouchableOpacity className="flex-row items-center justify-center bg-white-500 py-3 rounded-xl mt-4 border border-gray-300" onPress={() => handlesSocialAuth.handleSocialAuth("oauth_google")}>
          <Ionicons name="logo-google" size={24} color="#5e35c3" />
          <Text className="text-black text-lg font-semibold ml-2">
            Sign up with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center bg-[#273236] py-3 rounded-xl mt-4" onPress={() => handlesSocialAuth.handleSocialAuth("oauth_apple")}>
          <Ionicons name="logo-apple" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            Sign up with Apple
          </Text>
        </TouchableOpacity>

      </View>
      <View className="mt-6 items-center px-4">
  <Text className="text-xs text-gray-500 text-center">
    By signing up, you agree to our{" "}
    <Text className="text-[#5e35c3] underline">Terms & Conditions</Text> and{" "}
    <Text className="text-[#5e35c3] underline">Privacy Policy</Text>.
  </Text>
</View>
    </View>
  );
}