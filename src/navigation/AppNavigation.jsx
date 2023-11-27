import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthStack } from "./AuthStack"
import { ListStack } from "./ListStack"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator()

export function AppNavigator() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen
                name='List Screen'
                component={ListStack}
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name='Account Screen'
                component={AuthStack}
                options={{
                    title: "Cuenta",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}