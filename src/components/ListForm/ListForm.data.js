import * as Yup from "yup";

export function initialValues() {
    return {
        listTitle: ''
    }
}

export function validationSchema() {
    return Yup.object().shape({
        listTitle: Yup.string()
            .required('debe agregar un titulo'),
    })
}