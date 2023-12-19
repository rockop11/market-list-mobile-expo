import { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Button, Text, ListItem } from "@rneui/themed"
import { useFormik } from 'formik'
import { Modal } from '../Modal/Modal'
import { AddProductForm } from '../AddProductForm/AddProductForm';
import { db } from "../../utils/firebase"
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { styles } from "./ListForm.styles"
import Toast from 'react-native-toast-message';

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
        initialValues: {
            name: 'rocko'
        },
        onSubmit: async () => {
            await saveListToDB()
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

    const saveListToDB = async () => {
        try {
            const auth = getAuth()
            await setDoc(doc(db, "lists", `${auth.currentUser.email}`), { productList })
            OpenCloseModal()
            Toast.show({
                type: "success",
                position: "bottom",
                text1: "se guardo la lista"
            })
            //armar objeto para almacenar en firebase
        } catch (e) {
            console.log(e)
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
                <View style={styles.confirmModal}>
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
                </View>
            </Modal>
        </View>
    )
}