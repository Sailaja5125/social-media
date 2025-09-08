import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignoutButton from '@/components/SignoutButton'
const Index = () => {
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <SignoutButton/>
    </SafeAreaView>
  )
}

export default Index