import * as Yup from "yup";

export function initialValues() {
    return {
        productName: '',
        price: ''
    }
}

export function validationSchema() {
    return Yup.object().shape({
        productName: Yup.string()
            .required('campo requerido'),
        price: Yup.number()
            .typeError('ingrese un número')
            .required('campo requerido')
    })
}