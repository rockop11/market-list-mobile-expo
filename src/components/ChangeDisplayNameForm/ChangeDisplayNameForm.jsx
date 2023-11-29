import { View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { getAuth, updateProfile } from "firebase/auth"
import { initialValues, validationSchema } from "./ChangeDisplayNameForm.data"
import { useFormik } from 'formik'
import Toast from 'react-native-toast-message'
import { styles } from './ChangeDisplayNameForm.styles'

export function ChangeDisplayNameForm({ openCloseModalHandler, onReload }) {

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const auth = getAuth()
        await updateProfile(auth.currentUser, { displayName: formValues.displayName })
        onReload()
        openCloseModalHandler()
        Toast.show({
          text1: "Nombre cambiado",
          text2: "Ahora puedes usar tu nombre de usuario",
          position: "bottom",
          type: "success",
          duration: 3000,
        })
      } catch (err) {
        openCloseModalHandler()
        Toast.show({
          text1: "No se pudo cambiar el nombre",
          position: "bottom",
          type: "error",
          duration: 3000,
        })
      }
    }
  })

  return (
    <View>
      <Input
        placeholder='ingrese el nombre'
        onChangeText={text => formik.setFieldValue('displayName', text)}
        errorMessage={formik.errors.displayName}
        containerStyle={styles.inputContainer}
      />

      <View style={styles.btnContainer}>
        <Button
          title='Cambiar Nombre'
          buttonStyle={styles.button}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        />
        <Button title='Cerrar' buttonStyle={styles.button} color='error' onPress={openCloseModalHandler} />
      </View>
    </View>
  )
}