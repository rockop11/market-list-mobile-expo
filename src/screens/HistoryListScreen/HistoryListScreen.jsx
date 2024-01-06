import { useState, useEffect } from "react"
import { View, Text, ScrollView } from 'react-native'
import { ListItem, } from '@rneui/themed';
import { getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { db } from "../../utils/firebase"
import { styles } from "./HistoryList.styles"

export function HistoryListScreen() {

    const [historyList, setHistoryList] = useState([])

    const auth = getAuth()

    const getHistoryList = async () => {
        const newHistoryList = []
        const querySnapshot = await getDocs(collection(db, `${auth.currentUser.email}`));

        querySnapshot.forEach((doc) => {
            const date = doc.data().date

            const fecha = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
            const formattedDate = fecha.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

            const newData = { ...doc.data(), date: formattedDate };
            newHistoryList.push(newData);
        });

        setHistoryList(newHistoryList)
    }

    useEffect(() => {
        getHistoryList()
    }, [])

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', margin: 10 }}>Historial de Compras</Text>
            <ScrollView>
                <View style={styles.itemContainer}>
                    {
                        !historyList.length ? (<Text>Cargando...</Text>) : (
                            historyList.map((item, i) => (
                                <ListItem key={i} style={styles.listItem}>
                                    <ListItem.Title style={{ fontWeight: "bold" }}>{item.title} - ${item.total}</ListItem.Title>
                                    <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
                                </ListItem>
                            ))
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}