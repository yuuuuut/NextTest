import {
  Backdrop,
  Card,
  CardActions,
  CardMedia,
  makeStyles,
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import { useState } from 'react'

/** Styles */
const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%',
  },
  media: {
    height: 0,
    paddingTop: '80%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

/** Types */
type PostFormImagePreviewProps = {
  id: string
  path: string | undefined
  delete: (id: string) => void
}

/** Main */
export const PostFormImagePreview = (props: PostFormImagePreviewProps) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          onClick={handleToggle}
          className={classes.media}
          image={props.path}
          title="Paella dish"
        />
        <CardActions>
          <DeleteIcon
            color="secondary"
            onClick={() => props.delete(props.id)}
          />
        </CardActions>
      </Card>

      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <img src={props.path} />
      </Backdrop>
    </>
  )
}
