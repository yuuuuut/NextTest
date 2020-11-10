import React, {
    createContext,
    useCallback,
    useEffect,
    useState
} from "react";

import firebase  from 'firebase/app'
import { User }  from '../models/User'
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

async function createUser(user: User) {
    const userRef = firebase.firestore().collection('users').doc(user.uid)
    const doc = await userRef.get()

    if (doc.exists) {
        return
    }

    await userRef.set({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
    })
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [load, setLoad] = useState(true)

    const signout = useCallback(async () => {
        await firebase.auth().signOut()
            .then(() => {
                toast.success('🌝 ログアウトしました 🌝', {
                    position: 'bottom-left',
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
        if (user !== null) {
            return
        }

        firebase.auth().onAuthStateChanged(function (result) {
            if (result) {
                setLoad(true)

                const loginUser: User = {
                    uid: result.uid,
                    displayName: result.displayName,
                    photoURL: result.photoURL,
                }

                setUser(loginUser)
                createUser(loginUser)

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