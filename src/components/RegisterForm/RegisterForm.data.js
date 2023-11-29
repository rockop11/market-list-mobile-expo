import * as Yup from "yup"

export function initialValues() {
    return {
        email: '',
        password: '',
        repeatPassword: ''
    }
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email('email invalido')
            .required('el email es requerido'),
        password: Yup.string()
            .required('debe completar la contraseña')
            .length(6, "demasiado corta"),
        repeatPassword: Yup.string()
            .required("la contraseña es obligatoria")
            .length(6, 'demasiado corta')
            .oneOf([
                Yup.ref("password")
            ], "las contraseñas no coinciden")
    })
}