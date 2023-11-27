import { useState } from 'react';
import { View } from 'react-native'
import { Button, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.data';
import { auth } from "../../utils/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import Toast from 'react-native-toast-message';
import { styles } from './LoginForm.styles'

export function LoginForm() {
  const navigation = useNavigation()

  const [showPassword, setShowPassword] = useState(true)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await signInWithEmailAndPassword(auth, formValues.email, formValues.password)
        navigation.navigate('Profile')
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "No se pudo ingresar"
        })
      }
    }
  })

  const showPasswordHandler = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <View style={styles.container}>

      <Input
        placeholder='email'
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#ccc',
        }}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        onChangeText={text => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />

      <Input
        placeholder='contraseña'
        rightIcon={{
          type: 'material-community',
          name: showPassword ? 'eye-off-outline' : 'eye-outline',
          color: '#cccccc',
          onPress: showPasswordHandler
        }}
        secureTextEntry={showPassword}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        onChangeText={text => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Button
        title='Ingresa'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}