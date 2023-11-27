import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'
import { Button, Avatar } from "@rneui/themed"
import { auth } from '../../../utils/firebase'
import Toast from 'react-native-toast-message'
import { signOut } from "firebase/auth"

export function ProfileScreen() {

  const navigation = useNavigation()
  // const [user, setUser] = useState(null)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigation.navigate('Login')
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "No se pudo cerrar sesión"
      })
    }
  }

  // useEffect(() => {
  //   // setUser(auth.currentUser)
  // }, [])

  return (
    <View>
      <Text>Bienvenido</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}