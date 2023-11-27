import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { View, Text } from 'react-native'

export function ListScreen() {

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      console.log("list screen", JSON.stringify(user, null, 2))
    })
  }, [])

  return (
    <View>
      <Text>Index Page</Text>
    </View>
  )
}