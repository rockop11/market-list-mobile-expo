import { useState, useEffect } from "react"
import { View, Text } from 'react-native'
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
            <Text>historial</Text>
            {
                historyList.map((item, i) => (
                    <View key={i}>
                        <Text>$ {item.total} - {item.date}</Text>
                    </View>
                ))
            }
        </View>
    )
}