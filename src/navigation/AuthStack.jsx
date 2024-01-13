import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useUser } from "../hooks/useUser"
import { LoginScreen, RegisterScreen, ProfileScreen } from "../screens"

const Stack = createNativeStackNavigator()

export function AuthStack() {

    const { user } = useUser()

    return (
        <Stack.Navigator>
            {
                user ? (
                    <Stack.Screen
                        name='Profile'
                        component={ProfileScreen}
                        options={{ title: "Perfil" }}
                    />
                ) : (
                    <>
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
                    </>
                )
            }
        </Stack.Navigator>
    )
}