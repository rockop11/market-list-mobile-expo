import { useState } from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button } from "@rneui/themed"
import { signOut, getAuth } from "firebase/auth"
import { UserInfo } from '../../../components'
import Toast from 'react-native-toast-message'
import { styles } from "./ProfileScreen.styles"

export function ProfileScreen() {

  const navigation = useNavigation()

  const [_, setReload] = useState(false)
  const [loading, setLoading] = useState()
  const [loadingText, setLoadingText] = useState("")

  const handleLogout = async () => {
    try {
      const auth = getAuth()
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

  const onReload = () => {
    setReload((prevState) => !prevState)
  }

  return (
    <View style={styles.container}>
      <UserInfo
        onReload={onReload}
        setLoading={setLoading}
        setLoadingText={setLoadingText}
        loadingText={loadingText}
        loading={loading}
      />

      <Button title='Logout' onPress={handleLogout} containerStyle={styles.button} />
    </View>
  )
}