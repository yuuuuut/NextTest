import { useContext, useEffect } from 'react'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'

import { PostList } from '../components/posts/PostList'
import { AuthContext } from '../contexts/auth'
import { Layout } from '../components/Layout'
import { toast } from 'react-toastify'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

/** Main */
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
              <PostList />
            ) : (
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}
          </div>
        )}
      </Layout>
    </div>
  )
}

export default Home
