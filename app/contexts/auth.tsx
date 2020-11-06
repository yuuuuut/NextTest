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
    signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    load: false,
    signup: null,
    signout: null,
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

    const signout = useCallback(async () => {
        await firebase.auth().signOut()
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
            value={{ load, user, signup, signout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }