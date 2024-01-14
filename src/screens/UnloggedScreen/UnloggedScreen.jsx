import { View, Text } from "react-native"

export const UnloggedScreen = () => {
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
            <Text>Debes iniciar sesion...</Text>
        </View>
    )
}