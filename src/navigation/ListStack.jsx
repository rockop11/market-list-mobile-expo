import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ListScreen } from "../screens/ListScreen"
import { HistoryListScreen } from "../screens/HistoryListScreen/HistoryListScreen"
import { ListDetail } from "../screens/ListDetail"
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
            <Stack.Screen
                name='HistoryList'
                component={HistoryListScreen}
                options={{ title: "Historial" }}
            />
            <Stack.Screen
                name='Detail'
                component={ListDetail}
                options={{ title: "Detalle" }}
            />
        </Stack.Navigator>
    )
}