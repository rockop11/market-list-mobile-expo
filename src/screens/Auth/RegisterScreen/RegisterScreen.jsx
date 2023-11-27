import { View, ScrollView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RegisterForm } from '../../../components'
import { styles } from './RegisterScreen.styles'

export function RegisterScreen() {

  const navigation = useNavigation()

  const goToLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Registrate</Text>
        <RegisterForm />
        <View style={styles.textContainer}>
          <Text>Si ya estas registrado<Text onPress={goToLogin} style={styles.text}> Ingresá aca</Text></Text>
        </View>
      </View>
    </ScrollView>
  )
}