import { View, Text } from 'react-native'
import { ListForm } from "../../components"
import { styles } from "./ListScreen.styles"

export function ListScreen() {

  return (
    <View style={styles.container}>
      <Text>Market List</Text>
      <ListForm />
    </View>
  )
}