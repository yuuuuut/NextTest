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
    signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    load: false,
    signout: null,
})

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [load, setLoad] = useState(true)

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
            value={{ load, user, signout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }