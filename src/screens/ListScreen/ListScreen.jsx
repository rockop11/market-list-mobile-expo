import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { View, Text } from 'react-native'
import { ListForm } from "../../components"
import { styles } from "./ListScreen.styles"

export function ListScreen() {

  const [userLogged, setUserLogged] = useState(null)

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      setUserLogged(user)
    })
  }, [])

  if (!userLogged) {
    return <View style={styles.container}><Text>Debes iniciar Sesion</Text></View>
  }

  return (
    <View style={styles.container}>
      <Text>Market List</Text>
      <ListForm />
    </View>
  )
}