import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export const useUser = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const auth = getAuth()

        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])

    return { user }
}