import { useState, useEffect } from "react"
import { View, Text, ScrollView } from 'react-native'
import { ListItem } from '@rneui/themed';
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { db } from "../../utils/firebase"

export const ListDetail = ({ route, navigation }) => {
  const { id } = route.params

  const [listDetail, setListDetal] = useState({})
  const [productList, setProductList] = useState([])
  const [listDate, setListDate] = useState("")
  const [loader, setLoader] = useState(false)

  const auth = getAuth()

  const getDetailData = async () => {
    setLoader(true)
    const docRef = doc(db, auth.currentUser.email, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const date = docSnap.data().date
      const fecha = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
      const formattedDate = fecha.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

      setListDate(formattedDate)
      setListDetal(docSnap.data())
      setProductList(docSnap.data().productList)
      setLoader(false)
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getDetailData()
  }, [])


  if (loader) {
    return <Text>Cargando...</Text>
  }

  return (
    <View>
      <>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', margin: 10 }}>{listDetail.title}</Text>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}>Total: ${listDetail.total}</Text>
          <Text style={{ fontSize: 18, margin: 10 }}>{listDate}</Text>
        </View>

        <ScrollView>
          {
            productList.map((item, i) => (
              <ListItem bottomDivider key={item.id}>
                <ListItem.Content>
                  <ListItem.Title>{item.productName} - ${item.price}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </ScrollView>
      </>
    </View>
  )
}