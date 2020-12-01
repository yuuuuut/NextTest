import { useContext } from 'react'

import { createStyles, makeStyles } from '@material-ui/core'
import { PostsContext } from '../../contexts/post'
import { PostCard } from './PostCard'

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
  const { load, posts } = useContext(PostsContext)

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        {posts && (
          <div className={classes.cardArea}>
            {posts.map((post) => (
              <div key={post.id} className={classes.card}>
                <PostCard
                  load={load as boolean}
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
