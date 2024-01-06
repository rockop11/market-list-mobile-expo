import { useState } from 'react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from "./ListForm.data"
import { View, ScrollView } from 'react-native'
import { Button, Text, ListItem, Input } from "@rneui/themed"
import { Modal } from '../Modal/Modal'
import { AddProductForm } from '../AddProductForm/AddProductForm';
import { db } from "../../utils/firebase"
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { styles } from "./ListForm.styles"
import Toast from 'react-native-toast-message';

export function ListForm() {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValues, { resetForm }) => {
            await saveListToDB()
            resetForm({ values: { ...initialValues } })
        }
    })

    const [productList, setProductList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState('')
    const [buttonText, setButtonText] = useState('')
    const [loader, setLoader] = useState(false)

    const additionProductListPrice = (updatedProductList) => {
        const productPrices = updatedProductList.map(product => product.price)
        const totalPriceReducer = productPrices.reduce((total, price) => total + price, 0);
        const localePrice = totalPriceReducer.toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        setTotalPrice(localePrice)
    }

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

    const saveListToDB = async () => {
        setLoader(prevState => !prevState)
        try {
            const auth = getAuth()
            await addDoc(collection(db, `${auth.currentUser.email}`), {
                productList,
                date: new Date(Date.now()),
                total: totalPrice,
                title: formik.values.listTitle
            });
            setLoader(prevState => !prevState)
            OpenCloseModal()
            Toast.show({
                type: "success",
                position: "bottom",
                text1: "se guardo la lista"
            })
        } catch (e) {
            Toast.show({
                type: "error",
                position: "bottom",
                text1: "hubo un error"
            })
        }
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
            <AddProductForm
                setProductList={setProductList}
                additionProductListPrice={additionProductListPrice}
            />

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
                {
                    modalText === 'Desea guardar la lista?' && (
                        <Input
                            placeholder='Titulo'
                            errorMessage={formik.errors.listTitle}
                            onChangeText={(listTitle) => formik.setFieldValue('listTitle', listTitle)}
                            value={formik.values.productName}

                        />
                    )
                }
                <View style={styles.confirmModal}>
                    {
                        loader ? <Text>Guardando...</Text>
                            : <>
                                <Button title={buttonText}
                                    buttonStyle={modalText === 'Desea borrar la lista completa?' ? styles.deleteBtn : styles.saveBtn}
                                    onPress={modalText === 'Desea borrar la lista completa?' ? deleteProducList : formik.handleSubmit}
                                    onLoading={formik.isSubmitting}
                                />
                                <Button
                                    title='Cancelar'
                                    buttonStyle={styles.cancelBtn}
                                    onPress={OpenCloseModal}
                                />
                            </>
                    }
                </View>
            </Modal>
        </View>
    )
}
