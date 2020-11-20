import { useContext, useEffect } from 'react'

import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { Layout } from '../components/Layout'
import { AuthContext } from '../contexts/auth'
import { toast } from 'react-toastify'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

export const Home = () => {
  const { user, load, notAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (notAuthenticated) {
      toast.warning('ログインが必要です。', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [])

  return (
    <div>
      <Layout>
        {load ? (
          <div>Loading...</div>
        ) : (
          <div>
            {user ? (
              <h1 className="t-color">
                Login{user.displayName}
                <img src={user.photoURL} />
              </h1>
            ) : (
              <div>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
            )}
          </div>
        )}
      </Layout>

      <style jsx>{`
        .t-color {
          color: red;
        }
      `}</style>
    </div>
  )
}

export default Home
