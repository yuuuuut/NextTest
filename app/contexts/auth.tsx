import React, {
    createContext,
    useCallback,
    useEffect,
    useState
} from "react";

import firebase from 'firebase/app'
import { User } from '../models/User'

type AuthContextType = {
    user: User
    load: boolean
    signup: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    load: false,
    signup: null,
})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [load, setLoad] = useState(true)

    const signup = useCallback(async () => {
        const provider = new firebase.auth.GoogleAuthProvider()

        await firebase.auth().signInWithPopup(provider)
            .then((result) => {
                setUser(result.user)
            }).catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((result) => {
            if (result) {
                setLoad(true)
                setUser({
                    uid: result.uid,
                    displayName: result.displayName,
                    photoURL: result.photoURL,
                })
                setLoad(false)
            } else {
                setUser(null)
                setLoad(false)
            }
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{ load, user, signup }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }