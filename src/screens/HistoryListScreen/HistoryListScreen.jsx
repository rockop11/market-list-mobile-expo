import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { ListItem, Button } from '@rneui/themed';
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { db } from "../../utils/firebase"
import { Modal } from "../../components/Modal/Modal";
// import { styles } from "./HistoryList.styles"

export function HistoryListScreen() {

    const navigation = useNavigation()
    const auth = getAuth()

    const [historyList, setHistoryList] = useState([])
    const [loader, setLoader] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const getHistoryList = async () => {
        setLoader(true)
        const newHistoryList = []
        const querySnapshot = await getDocs(collection(db, `${auth.currentUser.email}`));

        querySnapshot.forEach((doc) => {
            const date = doc.data().date

            const fecha = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
            const formattedDate = fecha.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

            const newData = { ...doc.data(), date: formattedDate, id: doc.id };
            newHistoryList.push(newData);
        });

        setHistoryList(newHistoryList)
        //chequear aca si el array llega vacio, setear mensaje de cargando o lista vacia
        setLoader(false)
    }

    const goToListDetail = (id) => {
        navigation.navigate("Detail", { id: id })
    }

    const showModalHandler = () => {
        setShowModal(prevState => !prevState)
    }

    const deleteList = async (id) => {
        await deleteDoc(doc(db, `${auth.currentUser.email}`, id));
        setShowModal(prevState => !prevState)
        getHistoryList()
    }

    useEffect(() => {
        getHistoryList()
    }, [])

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', margin: 10 }}>Historial de Compras</Text>
            {
                loader ? (<ActivityIndicator size="large" color="#007bff" />)
                    : (
                        <ScrollView>
                            {
                                !historyList.length && (
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column', justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{ textAlign: 'center', margin: 20 }}>
                                            Aún no tienes listas guardadas
                                        </Text>
                                        <Button
                                            title="Voler a inicio"
                                            containerStyle={{ width: '80%' }}
                                            buttonStyle={{ borderRadius: 10 }}
                                            onPress={() => navigation.navigate('Menu')}
                                        />
                                    </View>
                                )
                            }
                            {
                                historyList.map((item) => (
                                    <View key={item.id}>
                                        <ListItem.Swipeable
                                            leftWidth={60}
                                            rightWidth={60}
                                            minSlideWidth={60}
                                            leftContent={() => (
                                                <Button
                                                    onPress={() => showModalHandler()}
                                                    icon={{ name: 'delete', color: 'white' }}
                                                    buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                                />
                                            )}
                                        >
                                            <ListItem.Content>
                                                <ListItem.Title style={{ fontWeight: "bold" }}>{item.title} - ${item.total}</ListItem.Title>
                                                <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
                                            </ListItem.Content>
                                            <ListItem.Chevron size={24} onPress={() => goToListDetail(item.id)} />
                                        </ListItem.Swipeable>


                                        <Modal show={showModal}>
                                            <Text>Modal Opened</Text>
                                            <Button title='Cancelar' onPress={showModalHandler} />
                                            <Button title='Eliminar' onPress={() => deleteList(item.id)} />
                                        </Modal>
                                    </View>
                                ))
                            }
                        </ScrollView>
                    )
            }
        </View >
    )
}