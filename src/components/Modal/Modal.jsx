import { Overlay } from "@rneui/themed"
import { styles } from "./Modal.styles"

export function Modal({ show, close, children }) {
    return (
        <Overlay isVisible={show}
            overlayStyle={styles.overlay}
            onBackdropPress={close}
        >
            {children}
        </Overlay>
    )
}