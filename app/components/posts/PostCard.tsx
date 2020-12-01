import { useContext, useState } from 'react'

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { Favorite, MoreVert } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

import { AuthContext } from '../../contexts/auth'
import { PostCardMedia } from './PostCardMedia'
import { PostCardMenu } from './PostCardMenu'
import { Image } from '../../models/Post'
import { AvatarKit } from '../UI/Avatar'

/** Style */
const useStyles = makeStyles({
  root: {
    width: 300,
  },
  cradMedia: {
    width: 300,
    height: 172,
  },
})

/** Types */
type PostCard = {
  load: boolean
  id: string
  images: Array<Image>
  path: string
  body: string
  uid: string
  photoURL: string
  displayName: string
}

/** Main */
export const PostCard = (props: PostCard) => {
  const classes = useStyles()

  const { user } = useContext(AuthContext)
  const load = props.load

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          load ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          ) : (
            <AvatarKit src={props.photoURL} />
          )
        }
        action={
          load ? null : (
            <>
              {user?.uid === props.uid && (
                <div>
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVert />
                  </IconButton>
                  <PostCardMenu
                    id={props.id}
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                  />
                </div>
              )}
            </>
          )
        }
        title={
          load ? (
            <Skeleton
              animation="wave"
              height={18}
              width="80%"
              style={{ marginBottom: 5 }}
            />
          ) : (
            <div>{props.displayName}</div>
          )
        }
        subheader="September 14, 2016"
      />
      {load ? (
        <Skeleton
          animation="wave"
          variant="rect"
          className={classes.cradMedia}
        />
      ) : (
        <PostCardMedia images={props.images} />
      )}
      <CardContent>
        {load ? (
          <>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {props.body}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {load ? null : (
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
        )}
      </CardActions>
    </Card>
  )
}
