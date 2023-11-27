import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ListScreen } from "../screens/ListScreen"

const Stack = createNativeStackNavigator()

export function ListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='List'
                component={ListScreen}
                options={{ title: "Inicio" }}
            />
        </Stack.Navigator>
    )
}