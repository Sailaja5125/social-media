import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather'
import { useSignOut } from '@/hooks/useSignOut'

export default function SignoutButton() {
 const {handleSignOut} = useSignOut();
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Feather name='log-out' size={24} color='[#273236]' />
    </TouchableOpacity>
  )
}