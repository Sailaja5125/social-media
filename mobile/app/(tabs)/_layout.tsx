import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SignedIn } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
const TabsLayout = () => {
    const insets = useSafeAreaInsets();
    if(!SignedIn){
        return <Redirect href="./(auth)" />
    }
  return (
    <Tabs screenOptions={
        {
            tabBarInactiveTintColor:'#273236',
            tabBarStyle:{
                backgroundColor:'#fff',
                borderTopWidth:1,
                borderTopColor:'#E1E8ED',
                height:60 +  insets.bottom,
                paddingTop:8,
            }
        }
    }>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color={color} />
          ),
            headerShown: false,
            tabBarActiveTintColor: '#5e35c3',
            title: '',
            
        }

    }
      />
      <Tabs.Screen
        name="search"
        options={{  
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
          headerShown: false,
          tabBarActiveTintColor: '#5e35c3',
          title: '',
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{ 
             tabBarIcon: ({ color, size }) => (
            <Feather name="message-circle" size={24} color={color} />
          ),
          headerShown: false,
          tabBarActiveTintColor: '#5e35c3',
          title: '',
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{ 
             tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
          headerShown: false,
          title: '',
          tabBarActiveTintColor: '#5e35c3',
         }}
      />
      <Tabs.Screen
        name="profile"
        options={{ 
             tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={24} color={color} />
          ),
          headerShown: false,
          tabBarActiveTintColor: '#5e35c3',
            title: '',
         }}
      />
    </Tabs>
  );
};

export default TabsLayout;
