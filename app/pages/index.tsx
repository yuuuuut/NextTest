import { PostList } from '../components/posts/PostList'
import { Layout } from '../components/Layout'

/** Main */
export const Home = () => {
  return (
    <div>
      <Layout>
        <PostList />
      </Layout>
    </div>
  )
}

export default Home
