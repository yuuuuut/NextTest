import { useEffect, useState } from 'react'

import { createStyles, makeStyles } from '@material-ui/core'

import { User } from '../../models/User'
import { Post } from '../../models/Post'
import { PostCard } from './PostCard'
import firebase from 'firebase/app'

/** Styles */
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    main: {
      width: '100%',
      backgroundColor: 'ghostwhite',
    },
    cardArea: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '20px',
      marginRight: '40px',
      marginLeft: '40px',
    },
    card: {
      padding: '10px',
    },
  })
)

/** Main */
export const PostList = () => {
  const classes = useStyles()

  // State
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

      setTimeout(() => {
        setLoad(false)
      }, 400)
    }
    loadPosts()
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        {posts.length > 0 && (
          <div className={classes.cardArea}>
            {posts.map((post) => (
              <div key={post.id} className={classes.card}>
                <PostCard
                  load={load}
                  id={post.id}
                  images={post.images}
                  path={post.images[0].path}
                  body={post.body}
                  uid={post.userData.uid}
                  photoURL={post.userData.photoURL as string}
                  displayName={post.userData.displayName as string}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
