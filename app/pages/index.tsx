import { useContext, useEffect } from 'react'

import { PostList } from '../components/posts/PostList'
import { AuthContext } from '../contexts/auth'
import { Layout } from '../components/Layout'
import { toast } from 'react-toastify'

/** Main */
export const Home = () => {
  const { notAuthenticated } = useContext(AuthContext)

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
        <PostList />
      </Layout>
    </div>
  )
}

export default Home
