import { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from "@rneui/themed"
import { styles } from "./ListForm.styles"

export function ListForm() {

    const [ productList, setProductList] = useState([])


    return (
        <View style={styles.inputsContainer}>
            <Input
                containerStyle={{ width: '55%' }}
                placeholder='Producto'
                leftIcon={{
                    name: 'basket-plus',
                    type: 'material-community',
                    size: 24,
                    color: '#848484',
                }}
            />
            <Input
                containerStyle={{ width: '30%' }}
                leftIcon={{
                    name: 'currency-usd',
                    type: 'material-community',
                    size: 24,
                    color: '#848484',
                    paddingBottom: 0
                }} 
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
            />
        </View>
    )
}