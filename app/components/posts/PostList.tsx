import { useEffect, useState } from 'react'

import { Card, CardContent } from '@material-ui/core'

import { User } from '../../models/User'
import { Post } from '../../models/Post'
import firebase from 'firebase/app'

/** Main */
export const PostList = () => {
  const [posts, setPosts] = useState<Array<Post>>([])
  const [load, setLoad] = useState(false)

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

  useEffect(() => {
    const loadPosts = async () => {
      setLoad(true)
      const snapshot = await firebase.firestore().collection('posts').get()

      if (snapshot.empty) {
        return
      }

      const newPosts = await getNewPosts(snapshot)

      setPosts(newPosts)
      setLoad(false)
    }
    loadPosts()
  }, [])

  return (
    <div>
      {load ? (
        <div>loding...</div>
      ) : (
        <>
          {posts.length > 0 && (
            <>
              <div>{posts.length}</div>
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent>{post.userData.photoURL}</CardContent>
                </Card>
              ))}
            </>
          )}
        </>
      )}
    </div>
  )
}
