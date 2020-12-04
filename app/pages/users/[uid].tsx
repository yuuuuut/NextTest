import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'

import { createStyles, makeStyles } from '@material-ui/core'

import { UserShowHeader } from '../../components/users/UserShowHeader'
import { loadNextPosts, loadPosts } from '../../functions/Functions'
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
  const memo = useMemo(() => ({ uid: '' }), [])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [load, setLoad] = useState(true)
  const [error, setError] = useState(false)
  const [postLoad, setPostLoad] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Array<Post>>([])
  const [isPaginationFinished, setIsPaginationFinished] = useState(false)
  const [query, setQuery] = useState<
    firebase.firestore.Query<firebase.firestore.DocumentData>
  >()

  /**
   * memoに現在表示しているuserのuidを取得しsetする。
   * もし一致しなければPostsとPaginationFinishedを
   * リセットする。
   */
  function changeUser() {
    if (queryUid.uid !== memo.uid) {
      setLoad(true)
      setPostLoad(true)
      setIsPaginationFinished(false)
      setPosts([])
    }

    memo.uid = queryUid.uid
  }
  changeUser()

  /**
   *
   */
  function onScroll() {
    if (isPaginationFinished || query === undefined) {
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

    loadNextPosts(query, setIsPaginationFinished, setPosts, posts)
  }

  /**
   *
   */
  async function getUser() {
    if (queryUid.uid === undefined) {
      return
    }

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
  }

  /**
   *
   */
  async function getUserPosts() {
    if (queryUid.uid === undefined) {
      return
    }

    const query = await firebase
      .firestore()
      .collection('posts')
      .where('userId', '==', queryUid.uid)
      .orderBy('createdAt', 'desc')
      .limit(6)

    setQuery(query)

    loadPosts(query, setIsPaginationFinished, setPosts, posts)
  }

  /** useEffect */
  useEffect(() => {
    getUser()
    getUserPosts()

    setTimeout(() => {
      setPostLoad(false)
      setLoad(false)
    }, 500)
  }, [queryUid.uid])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [posts, scrollContainerRef.current, isPaginationFinished])

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
