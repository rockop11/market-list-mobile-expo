import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { View, Text } from 'react-native'
import { Avatar, Button } from "@rneui/themed"
import { Modal } from "../Modal/Modal"
import { LoadingModal } from '../LoadingModal/LoadingModal'
import { ChangeDisplayNameForm } from '../ChangeDisplayNameForm/ChangeDisplayNameForm'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { styles } from './UserInfo.styles'


export function UserInfo({ onReload, setLoading, setLoadingText, loadingText, loading }) {

    const { uid, displayName, photoURL } = getAuth().currentUser

    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [avatar, setAvatar] = useState(photoURL)

    const openCloseModalHandler = () => {
        setShowModal(prevState => !prevState)
    }

    const selectImageModal = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if (!result.canceled) {
            uploadImage(result.assets[0].uri)
            
        }
    }

    const uploadImage = async (uri) => {
        setLoadingText("Actualizando Avatar...")
        setLoading(true)
        const response = await fetch(uri)
        const blob = await response.blob()

        const storage = getStorage()
        const storageRef = ref(storage, `avatar/${uid}`)

        uploadBytes(storageRef, blob)
            .then((snapshoot) => {
                updatePhotoUrl(snapshoot.metadata.fullPath)
            })
    }

    const updatePhotoUrl = async (imagePath) => {
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)
        const imageUrl = await getDownloadURL(imageRef)

        const auth = getAuth()
        updateProfile(auth.currentUser, { photoURL: imageUrl })
        

        setAvatar(imageUrl)
        setLoading(false)
    }

    const selectDisplayNameModal = () => {
        setShowModal(prevState => !prevState)
        setModalContent(
            <ChangeDisplayNameForm onReload={onReload} openCloseModalHandler={openCloseModalHandler} />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Bienvenido {displayName || "Anonimo"}</Text>

            <Avatar
                size="large"
                rounded
                containerStyle={styles.avatar}
                source={{ uri: avatar }}
                icon={{ type: "material", name: "person" }}
                onPress={selectImageModal}
            >
                <Avatar.Accessory size={23} />
            </Avatar>

            <Button
                title='Cambiar Nombre'
                buttonStyle={styles.button}
                onPress={selectDisplayNameModal}
            />

            <Modal show={showModal}>
                {modalContent}
            </Modal>

            <LoadingModal show={loading} text={loadingText} />
        </View>
    )
}
