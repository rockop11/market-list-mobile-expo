import { useState } from 'react';
import { View } from 'react-native'
import { Button, Input } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { initialValues, validationSchema } from './RegisterForm.data';
import { auth } from "../../utils/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import Toast from 'react-native-toast-message';
import { styles } from './RegisterForm.styles'

export function RegisterForm() {
  const navigation = useNavigation()
  
  const [showPassword, setShowPassword] = useState(true)
  const [showRepeatPassword, setShowRepeatPassword] = useState(true)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
        navigation.navigate('Login')
      } catch (error) {
        console.log(error)
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error de registro"
        })
      }
    }
  })

  const showPasswordHandler = () => {
    setShowPassword(prevState => !prevState)
  }

  const showPasswordRepeatHandler = () => {
    setShowRepeatPassword(prevState => !prevState)
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
        onChangeText={text => formik.setFieldValue("email", text)}
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
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        onChangeText={text => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Input
        placeholder='repetir contraseña'
        rightIcon={{
          type: 'material-community',
          name: showRepeatPassword ? 'eye-off-outline' : 'eye-outline',
          color: '#cccccc',
          onPress: showPasswordRepeatHandler
        }}
        secureTextEntry={showRepeatPassword}
        inputStyle={styles.input}
        containerStyle={styles.inputContainer}
        onChangeText={text => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />

      <Button
        title='Registrate'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}