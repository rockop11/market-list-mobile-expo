import { useState, useEffect } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { onAuthStateChanged, getAuth } from "firebase/auth"
import { LoginScreen, RegisterScreen, ProfileScreen } from "../screens"


const Stack = createNativeStackNavigator()

export function AuthStack() {
    const [userLogged, setUserLogged] = useState(null)


    useEffect(() => {
        const auth = getAuth()

        onAuthStateChanged(auth, (user) => {
            setUserLogged(user)
        })
    }, [])


    return (
        <Stack.Navigator>
            {
                userLogged && (
                    <Stack.Screen
                        name='Profile'
                        component={ProfileScreen}
                        options={{ title: "Perfil" }}
                    />
                )
            }

            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{ title: "Ingresa" }}
            />

            <Stack.Screen
                name='Register'
                component={RegisterScreen}
                options={{ title: "Registro" }}
            />
        </Stack.Navigator>
    )
}