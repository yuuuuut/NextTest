import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core'

import { Layout } from '../components/Layout'

import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import { User } from '../models/User'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
)

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
    <AuthContext.Provider value={{ load, user, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthPgae: React.FC = ({ children }) => {
  const { user, load } = useContext(AuthContext)
  const classes = useStyles()
  const router = useRouter()

  useEffect(() => {
    if (user === null && !load) {
      router.push('/')
    }
  }, [user, load])

  return (
    <Layout>
      {user === null ? (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>{children}</>
      )}
    </Layout>
  )
}

export { AuthContext, AuthProvider, AuthPgae }
