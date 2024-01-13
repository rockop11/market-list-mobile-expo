import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useUser } from "../hooks/useUser"
import { MenuScreen, UnloggedScreen, ListDetail, HistoryListScreen, ListScreen } from "../screens"

const Stack = createNativeStackNavigator()

export function ListStack() {
    
    const { user } = useUser()

    return (
        <Stack.Navigator>
            {
                !user ? (
                    <Stack.Screen
                        name='Unlogged'
                        component={UnloggedScreen}
                    />
                ) : (
                    <>
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
                    </>
                )
            }
        </Stack.Navigator>
    )
}