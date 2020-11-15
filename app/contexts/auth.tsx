import React, {
    createContext,
    useCallback,
    useEffect,
    useState
} from "react";

import firebase  from 'firebase/app'
import { toast } from "react-toastify";
import { User }  from '../models/User'

type AuthContextType = {
    user: User | null
    load: boolean
    signout: () => Promise<void>
}

const AuthContext = createContext<Partial<AuthContextType>>({
    user: null,
    load: false,
    signout: undefined,
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

const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [load, setLoad] = useState(true)

    const signout = useCallback(async () => {
        await firebase.auth().signOut()
            .then(() => {
                toast.success('ログアウトしました。', {
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

                const url = result.photoURL as string | undefined

                const loginUser: User = {
                    uid: result.uid,
                    displayName: result.displayName,
                    photoURL: url,
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