import React, {
    createContext,
    useCallback,
    useEffect,
    useState
} from "react";

import firebase from 'firebase/app'
import { User } from '../models/User'
import { toast } from "react-toastify";

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
            .then(() => {
                toast.success('🌝 ログアウトしました 🌝', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }).catch((e) => {
                console.error(e)
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

                setTimeout(() => {
                    setLoad(false)
                }, 500)
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