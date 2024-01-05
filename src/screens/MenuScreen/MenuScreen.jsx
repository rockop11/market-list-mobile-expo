import { useState, useEffect } from "react"
import { View, Text } from 'react-native'
import { Button } from "@rneui/themed"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigation } from '@react-navigation/native';
import { styles } from "./MenuScreen.styles"


export function MenuScreen() {

    const navigation = useNavigation()

    const [userLogged, setUserLogged] = useState(null)

    useEffect(() => {
        const auth = getAuth()

        onAuthStateChanged(auth, (user) => {
            setUserLogged(user)
        })
    }, [])

    if (!userLogged) {
        return <View style={styles.unloggedContainer}><Text>Debes iniciar Sesion</Text></View>
    }

    return (
        <View style={styles.container}>
            <Button
                title='Crear lista'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.button}
                onPress={() => navigation.navigate('List')}
            />

            <Button
                title='Mis listas'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.button}
                onPress={() => navigation.navigate('HistoryList')}
            />
        </View>
    )
}