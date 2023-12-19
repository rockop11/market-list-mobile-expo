import 'react-native-get-random-values';
import { View } from 'react-native'
import { Button, Text, Input } from "@rneui/themed"
import { useFormik } from 'formik'
import { initialValues, validationSchema } from "./AddProductForm.data"
import { v4 as uuidv4 } from 'uuid';
import { styles } from "./AddProductForm.styles"

export function AddProductForm({ setProductList, additionProductListPrice }) {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: (formValues, { resetForm }) => {
            const stringToNumber = parseFloat(formValues.price)

            const newProduct = {
                id: uuidv4(),
                productName: formValues.productName,
                price: stringToNumber
            }
            setProductList(prevProductList => {
                const updatedProductList = [...prevProductList]
                updatedProductList.unshift(newProduct)
                additionProductListPrice(updatedProductList)
                return updatedProductList
            })

            resetForm({ values: { ...initialValues } })
        }
    })


    return (
        <View style={styles.inputsContainer}>

            <Input
                containerStyle={{ width: "48%" }}
                placeholder='Producto'
                value={formik.values.productName}
                leftIcon={{
                    name: 'basket-plus',
                    type: 'material-community',
                    size: 24,
                    color: '#848484',
                }}
                errorMessage={formik.errors.productName}
                onChangeText={(text) => formik.setFieldValue('productName', text)}
            />
            <Input
                containerStyle={{ width: '35%' }}
                placeholder='Precio'
                value={formik.values.price}
                leftIcon={{
                    name: 'currency-usd',
                    type: 'material-community',
                    size: 24,
                    color: '#848484',
                    paddingBottom: 0
                }}
                errorMessage={formik.errors.price}
                onChangeText={(price) => formik.setFieldValue('price', price)}
            />

            <Button
                buttonStyle={styles.button}
                containerStyle={{ marginBottom: 20 }}
                icon={{
                    name: 'plus',
                    type: 'material-community',
                    size: 20,
                    color: 'white',
                }}
                onPress={formik.handleSubmit}
                onLoading={formik.isSubmitting}
            />
        </View>
    )
}