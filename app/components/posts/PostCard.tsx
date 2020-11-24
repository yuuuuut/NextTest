import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'

import { Favorite, MoreVert } from '@material-ui/icons'
import { AvatarKit } from '../UI/Avatar'

/** Style */
const useStyles = makeStyles({
  root: {
    width: 300,
  },
  media: {
    height: 0,
    paddingTop: '60.25%',
  },
})

/** Types */
type PostCard = {
  id: string
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
      <CardMedia className={classes.media} image={props.path} />
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
