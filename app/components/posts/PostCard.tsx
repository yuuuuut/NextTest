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
import { PostCardMedia } from './PostCardMedia'
import { Image } from '../../models/Post'
import { AvatarKit } from '../UI/Avatar'

/** Style */
const useStyles = makeStyles({
  root: {
    width: 300,
  },
})

/** Types */
type PostCard = {
  id: string
  images: Array<Image>
  path: string
  body: string
  photoURL: string
  displayName: string
}

/** Main */
export const PostCard = (props: PostCard) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<AvatarKit src={props.photoURL} />}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={props.displayName}
        subheader="September 14, 2016"
      />
      <PostCardMedia images={props.images} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
      </CardActions>
    </Card>
  )
}
