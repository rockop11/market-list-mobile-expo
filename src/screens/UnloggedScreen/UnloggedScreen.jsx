import { View, Text } from "react-native"
import { styles } from "./UnloggedScree.styles"

export const UnloggedScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Debes iniciar sesión.</Text>
        </View>
    )
}