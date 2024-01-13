
import { View } from 'react-native'
import { Button } from "@rneui/themed"
import { useNavigation } from '@react-navigation/native';
import { styles } from "./MenuScreen.styles"


export function MenuScreen() {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Button
                title='Crear lista'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.button}
                onPress={() => navigation.navigate('List')}
            />

            <Button
                title='Historial'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.button}
                onPress={() => navigation.navigate('HistoryList')}
            />
        </View>
    )
}