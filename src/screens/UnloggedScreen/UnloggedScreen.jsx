import { View, Text } from "react-native"
import { Button } from "@rneui/base"
import { useNavigation } from "@react-navigation/native"

export const UnloggedScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
            <Text>Debes iniciar sesion...</Text>

            <Button
                title='Ir al Login'
                containerStyle={{ width: '85%', borderRadius: 10 }}
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}