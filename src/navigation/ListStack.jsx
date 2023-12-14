import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ListScreen } from "../screens/ListScreen"
import { MenuScreen } from "../screens"

const Stack = createNativeStackNavigator()

export function ListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Menu'
                component={MenuScreen}
                options={{ title: "Inicio" }}
            />
            <Stack.Screen
                name='List'
                component={ListScreen}
                options={{ title: "Lista" }}
            />
        </Stack.Navigator>
    )
}