import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'

import { UserShowHeader } from '../../components/users/UserShowHeader'
//import { loadNextPosts, loadPosts } from '../../functions/Functions'
import { createStyles, makeStyles } from '@material-ui/core'
import { PostCard } from '../../components/posts/PostCard'
import { Layout } from '../../components/Layout'
import { User } from '../../models/User'
import { Post } from '../../models/Post'
import firebase from 'firebase/app'

/** Styles */
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    main: {
      width: '100%',
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

/** Types */
type Query = {
  uid: string
}

/** Main */
const UserShow = () => {
  const classes = useStyles()
  const router = useRouter()
  const queryUid = router.query as Query
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [user, setUser] = useState<User | null>(null)
  const [load, setLoad] = useState(true)
  const [error, setError] = useState(false)
  //const [q, setQ] = useState('')
  const [postLoad, setPostLoad] = useState(false)
  const [posts, setPosts] = useState<Array<Post>>([])
  const [isPaginationFinished, setIsPaginationFinished] = useState(false)

  function onScroll() {
    if (isPaginationFinished) {
      return
    }

    const container = scrollContainerRef.current
    if (container === null) {
      return
    }

    const rect = container.getBoundingClientRect()
    if (rect.top + rect.height > window.innerHeight) {
      return
    }

    //loadNextPosts(q, setIsPaginationFinished, setPosts, posts)
  }

  const memo = useMemo(() => ({ props: '' }), [])
  /** useEffect */

  if (queryUid.uid !== memo.props) {
    setIsPaginationFinished(false)
    setPosts([])
  }

  memo.props = queryUid.uid

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [posts, scrollContainerRef.current, isPaginationFinished])

  useEffect(() => {
    async function getUser() {
      if (queryUid.uid === undefined) {
        return
      }

      //setQ(queryUid.uid)

      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(queryUid.uid)
        .get()

      if (!doc.exists) {
        setError(true)
        return
      }

      const gotUser = doc.data() as User
      gotUser.uid = doc.id
      setUser(gotUser)

      /*
      const q = await firebase
        .firestore()
        .collection('posts')
        .where('userId', '==', queryUid.uid)
        .orderBy('createdAt', 'desc')
        .limit(6)
        */

      //setQ(q)

      //loadPosts(q, setIsPaginationFinished, setPosts, posts)

      setTimeout(() => {
        setPostLoad(false)
        setLoad(false)
      }, 100)
    }
    getUser()
  }, [queryUid.uid])

  return (
    <div>
      <Layout>
        {error ? (
          <Error statusCode={404} />
        ) : (
          <>
            {user && <UserShowHeader user={user} load={load} />}
            <div className={classes.root}>
              <div className={classes.main}>
                {posts && (
                  <div className={classes.cardArea} ref={scrollContainerRef}>
                    {posts.map((post) => (
                      <div key={post.id} className={classes.card}>
                        <PostCard
                          load={postLoad}
                          id={post.id}
                          images={post.images}
                          path={post.images[0].path}
                          body={post.body}
                          uid={post.userData.uid}
                          photoURL={post.userData.photoURL as string}
                          displayName={post.userData.displayName as string}
                          createdAt={post.createdAt}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Layout>
    </div>
  )
}

export default UserShow
