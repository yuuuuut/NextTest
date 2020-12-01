import { createContext, useCallback, useEffect, useState } from 'react'

import { Post } from '../models/Post'
import { User } from '../models/User'
import firebase from 'firebase/app'

/** Types */
type PostsContextType = {
  load: boolean
  posts: Array<Post>
  remove: (id: string) => Promise<void>
}

/** Context */
const PostsContext = createContext<Partial<PostsContextType>>({
  load: false,
  posts: [],
  remove: undefined,
})

/** Functions */

/**
 * PostにidとuserDataを追加してnewPosts[]にpushする
 * @param snapshot
 * @return {Array<Post>} Postの配列
 */
const getNewPosts = async (snapshot: firebase.firestore.QuerySnapshot) => {
  const newPosts: Array<Post> = []

  await Promise.all(
    snapshot.docs.map(async (doc) => {
      const post = doc.data() as Post
      post.id = doc.id

      const user = await post.user.get()

      post.userData = user.data() as User

      newPosts.push(post)
    })
  )
  return newPosts
}

/** Main */
const PostsProvider: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const loadPosts = async () => {
      setLoad(true)
      const snapshot = await firebase.firestore().collection('posts').get()

      if (snapshot.empty) {
        return
      }

      const newPosts = await getNewPosts(snapshot)
      setPosts(newPosts)

      setTimeout(() => {
        setLoad(false)
      }, 300)
    }
    loadPosts()
  }, [])

  /**
   * Postの削除。PostListからも削除する
   */
  const remove = useCallback(
    async (id: string) => {
      await firebase.firestore().collection('posts').doc(id).delete()

      const newPosts = posts.filter((post) => {
        return post.id !== id
      })
      setPosts(newPosts)
    },
    [posts]
  )

  return (
    <PostsContext.Provider value={{ load, posts, remove }}>
      {children}
    </PostsContext.Provider>
  )
}

export { PostsContext, PostsProvider }
