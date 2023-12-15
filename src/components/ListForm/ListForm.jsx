import { useState } from 'react'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { View, ScrollView } from 'react-native'
import { Input, Button, Text, ListItem } from "@rneui/themed"
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ListForm.data'
import { Modal } from '../Modal/Modal'
import { styles } from "./ListForm.styles"

export function ListForm() {

    const [productList, setProductList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')
    const [buttonText, setButtonText] = useState('')

    const additionProductListPrice = (updatedProductList) => {
        const productPrices = updatedProductList.map(product => product.price)
        const totalPriceReducer = productPrices.reduce((total, price) => total + price, 0);
        const localePrice = totalPriceReducer.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        setTotalPrice(localePrice)
    }

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

    const OpenCloseModal = (id) => {
        setShowModal(prevState => !prevState)

        if (id === "delete") {
            setModalText('Desea borrar la lista completa?')
            setButtonText('Borrar lista')
        }

        if (id === 'save') {
            setModalText('Desea guardar la lista?')
            setButtonText('Guardar lista')
        }
    }

    const saveListToDB = () => {
        console.log("saved")
        //almacenar en firebase
    }

    const deleteProducList = () => {
        setProductList([])
        setTotalPrice(0)
        OpenCloseModal()
    }

    const removeProductFromList = (id) => {
        const filteredList = productList.filter((product) => {
            return product.id !== id
        })
        setProductList(filteredList)
        additionProductListPrice(filteredList)
    }

    return (
        <View>
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

            <View style={styles.totalContainer}>
                {
                    productList.length > 0 && (
                        <>
                            <View style={styles.btnContainer}>
                                <Button title='Borrar lista' buttonStyle={styles.btnDeleteList} onPress={() => OpenCloseModal("delete")} />
                                <Button title='Guardar lista' buttonStyle={styles.btnSaveList} onPress={() => OpenCloseModal("save")} />
                            </View>
                            <Text style={styles.totalText}>Total  ${totalPrice}</Text>
                        </>
                    )
                }
            </View>

            <ScrollView>
                {
                    productList.map((product, i) => (
                        <ListItem.Swipeable
                            key={i}
                            leftWidth={60}
                            rightWidth={40}
                            minSlideWidth={40}
                            leftContent={() => (
                                <Button
                                    containerStyle={{
                                        flex: 1,
                                        justifyContent: "center",
                                        backgroundColor: "red",
                                        alignItems: 'start',
                                    }}
                                    type="clear"
                                    icon={{
                                        name: "delete-outline",
                                        type: "material-community",
                                        size: 28,
                                        color: '#ffffff',
                                    }}
                                    onPress={() => removeProductFromList(product.id)}
                                />
                            )}
                        >
                            <ListItem.Content>
                                <ListItem.Title style={{ fontSize: 20 }}>{product.productName}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Title style={{ fontSize: 18, fontWeight: 'bold' }}>$ {product.price}</ListItem.Title>
                            <ListItem.Chevron />
                        </ListItem.Swipeable>
                    ))
                }
            </ScrollView>

            <Modal show={showModal}>
                <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 16 }}>{modalText}</Text>
                <View style={styles.confirmModal}>
                    <Button title={buttonText}
                        onPress={modalText === 'Desea borrar la lista completa?' ? deleteProducList : saveListToDB}
                        buttonStyle={modalText === 'Desea borrar la lista completa?' ? styles.deleteBtn : styles.saveBtn}
                    />
                    <Button
                        title='Cancelar'
                        buttonStyle={styles.cancelBtn}
                        onPress={OpenCloseModal}
                    />
                </View>
            </Modal>
        </View>
    )
}