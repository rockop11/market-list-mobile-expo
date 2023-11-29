import { View, ScrollView } from 'react-native'
import { Text } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { LoginForm } from '../../../components'
import { styles } from './LoginScreen.styles'


export function LoginScreen() {
  const navigation = useNavigation()

  const goToRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Ingresa</Text>
        <LoginForm />
        <View style={styles.textContainer}>
          <Text>No tenes cuenta? </Text>
          <Text onPress={goToRegister} style={styles.register}>Regsitrate aca</Text>
        </View>
      </View>
    </ScrollView>
  )
}