import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    unloggedContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 12,
        flex: 1,
    },
    btnContainer: {
        width: "45%",
    },
    button: {
        borderRadius: 10,
        height: "25%",
        fontSize: 18
    }
})