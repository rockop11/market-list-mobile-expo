import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    itemContainer: {
        // borderWidth: 1,
        // borderColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        width: '100%',
    },
    listItem: { 
        // borderWidth: 1, 
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10
    }
})