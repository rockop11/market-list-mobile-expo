import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputsContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#02d31e'
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    totalText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    btnContainer: {
        gap: 8
    }, 
    btnDeleteList: {
        backgroundColor: 'red',
        borderRadius: 10
    },
    btnSaveList: {
        borderRadius: 10
    },
    confirmModal: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-around',
    },
    deleteBtn: {
        backgroundColor: 'red',
        borderRadius: 10
    },
    saveBtn: {
        backgroundColor: '#02d31e',
        borderRadius: 10
    },
    cancelBtn: {
        borderRadius: 10
    }
})