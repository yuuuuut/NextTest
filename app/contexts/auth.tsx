import React, { createContext, useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { User } from '../models/User'
import firebase from 'firebase/app'

/** Types */
type AuthContextType = {
  user: User | null
  load: boolean
  signin: () => Promise<void>
  signout: () => Promise<void>
}

/** Context */
const AuthContext = createContext<Partial<AuthContextType>>({
  user: null,
  load: false,
  signin: undefined,
  signout: undefined,
})

/** Functions */
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

/** Main */
const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null | undefined>(null)
  const [load, setLoad] = useState(true)

  const signin = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user as User)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const signout = useCallback(async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/')

        toast.success('ログアウトしました。', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  useEffect(() => {
    if (user !== null) {
      setLoad(false)
      return
    }

    firebase.auth().onAuthStateChanged(function (result) {
      if (result) {
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
    <AuthContext.Provider value={{ user, load, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
