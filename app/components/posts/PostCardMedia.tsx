import {
  Backdrop,
  Box,
  CardMedia,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core'

import { BackDropPostImage } from '../UI/BackDropPostImage'
import { PostCardMediaChild } from './PostCardMediaChild'
import { Image } from '../../models/Post'
import { useState } from 'react'
import { Close } from '@material-ui/icons'

/** Style */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageMain: {
      MaxWidth: 300,
      height: 172,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    oneImage: {
      width: 300,
      height: 172,
      objectFit: 'cover',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      color: '#fff',
    },
    iconButtonBg: {
      backgroundColor: '#777777',
      opacity: 0.9,
      pointerEvents: 'none',
    },
    white: {
      color: 'white',
    },
  })
)

/** Types */
type PostCardMediaProps = {
  images: Array<Image>
}

/** Main */
export const PostCardMedia = (props: PostCardMediaProps) => {
  const classes = useStyles()

  const imgLength = props.images.length
  const images = props.images

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    document.body.removeAttribute('style')
    setOpen(false)
  }

  const handleToggle = () => {
    document.body.setAttribute('style', 'overflow: hidden;')
    setOpen(!open)
  }

  return (
    <>
      <CardMedia>
        <div className={classes.imageMain}>
          {imgLength === 1 ? (
            <>
              <img
                src={images[0].path}
                className={classes.oneImage}
                onClick={() => handleToggle()}
              />
              <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={handleClose}
              >
                <Box
                  position="absolute"
                  top={20}
                  right={30}
                  onClick={handleClose}
                >
                  <IconButton className={classes.iconButtonBg}>
                    <Close className={classes.white} fontSize="large" />
                  </IconButton>
                </Box>
                <BackDropPostImage path={images[0].path} />
              </Backdrop>
            </>
          ) : (
            <>
              {images.map((image, idx) => (
                <PostCardMediaChild
                  key={image.id}
                  images={images}
                  imgLength={imgLength}
                  image={image}
                  idx={idx}
                />
              ))}
            </>
          )}
        </div>
      </CardMedia>
    </>
  )
}
