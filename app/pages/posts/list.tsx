import { useContext, useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { AuthContext } from '../../contexts/auth'
import { Post } from '../../models/Post'
import firebase from 'firebase/app'

const List = () => {
  const { user } = useContext(AuthContext)

  const [posts, setPosts] = useState<Array<Post>>([])

  useEffect(() => {
    const loadPosts = async () => {
      const snapshot = await firebase.firestore().collection('posts').get()

      if (snapshot.empty) {
        return
      }

      const gotPosts = snapshot.docs.map((doc) => {
        const post = doc.data() as Post
        post.id = doc.id
        return post
      })
      setPosts(gotPosts)
    }

    loadPosts()
  }, [user])

  return <Layout>{posts.length}</Layout>
}

export default List
