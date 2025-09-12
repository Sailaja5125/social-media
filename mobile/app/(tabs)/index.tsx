import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignoutButton from '@/components/SignoutButton'
import { useUserSync } from '@/hooks/useUserSync'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PostComposer from '@/components/PostComposer'
import PostList from '@/components/PostList'
const HomeScreen = () => {
  useUserSync()
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <FontAwesome name="connectdevelop" size={24} color="black" />
        <Text className="text-xl font-bold text-gray-900">Home</Text>
        <SignoutButton/>
      </View>

       <ScrollView>
        <PostComposer/>
        <PostList/>
       </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen