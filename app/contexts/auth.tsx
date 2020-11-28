import React, { createContext, useCallback, useEffect, useState } from 'react'

import { toast } from 'react-toastify'
import { User } from '../models/User'
import firebase from 'firebase/app'

/** Types */
type AuthContextType = {
  user: User | null
  load: boolean
  notAuthenticated: boolean
  signin: () => Promise<void>
  signout: () => Promise<void>
}

/** Context */
const AuthContext = createContext<Partial<AuthContextType>>({
  user: null,
  load: false,
  notAuthenticated: false,
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
  const [user, setUser] = useState<User | null>(null)
  const [load, setLoad] = useState(true)
  const [notAuthenticated, setNotAuthenticated] = useState(false)

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
      setNotAuthenticated(false)
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

        setNotAuthenticated(false)
        setLoad(false)
      } else {
        setNotAuthenticated(true)
        setUser(null)
        setLoad(false)
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, load, notAuthenticated, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
