import { useEffect, useRef, useState } from 'react'

import { createStyles, makeStyles } from '@material-ui/core'

import { loadPosts, loadNextPosts } from '../../functions/Functions'
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [load, setLoad] = useState(false)
  const [posts, setPosts] = useState<Array<Post>>([])
  const [isPaginationFinished, setIsPaginationFinished] = useState(false)

  // Query
  function Query() {
    return firebase
      .firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(6)
  }

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

    loadNextPosts(Query(), setIsPaginationFinished, setPosts, posts)
  }

  /** useEffect */

  useEffect(() => {
    setLoad(true)

    loadPosts(Query(), setIsPaginationFinished, setPosts, posts)

    setTimeout(() => {
      setLoad(false)
    }, 300)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [posts, scrollContainerRef.current, isPaginationFinished])

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        {posts && (
          <div className={classes.cardArea} ref={scrollContainerRef}>
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
