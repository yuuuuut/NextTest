import { useState } from 'react'

import {
  Backdrop,
  Box,
  CardMedia,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core'

import { ChevronLeft, ChevronRight, Close } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { Image } from '../../models/Post'

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
    twoImage: {
      width: 150,
      height: 172,
      objectFit: 'cover',
      margin: 0.5,
    },
    threeImage: {
      width: 150,
      height: 171,
      objectFit: 'cover',
      margin: 0.5,
    },
    fourImage: {
      width: 150,
      height: 85,
      objectFit: 'cover',
      margin: 0.5,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      color: '#fff',
    },
    backdropImage: {
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
    },
    iconButtonBg: {
      backgroundColor: '#777777',
      opacity: 0.9,
      pointerEvents: 'none',
    },
    imageCount: {
      position: 'fixed',
      top: '50&',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    white: {
      color: 'white',
    },
  })
)

/** Types */
type PostCardMediaProps = {
  load: boolean
  images: Array<Image>
}

/** Main */
export const PostCardMedia = (props: PostCardMediaProps) => {
  const classes = useStyles()
  const load = props.load
  const images = props.images
  const imgLength = props.images.length

  // State
  const [open, setOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  /**
   * styleAttributeを削除してopenをfalseに
   */
  const handleClose = () => {
    document.body.removeAttribute('style')
    setOpen(false)
  }

  /**
   * styleAttributeを設定して、currentIndex・currentImageをセット、
   * openを反転させる
   * @param idx
   */
  const handleToggle = (idx: number) => {
    document.body.setAttribute('style', 'overflow: hidden;')

    setCurrentIndex(idx)
    setCurrentImage(props.images[idx].path)
    setOpen(!open)
  }

  /**
   * 現在のimages[index]に + 1 して次の画像をセットする
   * @param id
   */
  const add = (id: number) => {
    setCurrentImage(props.images[id + 1].path)
    setCurrentIndex(id + 1)
  }

  /**
   * 現在のimages[index]に - 1 して前の画像をセットする
   * @param id
   */
  const back = (id: number) => {
    setCurrentImage(props.images[id - 1].path)
    setCurrentIndex(id - 1)
  }

  return (
    <>
      {load ? (
        <Skeleton
          animation="wave"
          variant="rect"
          className={classes.imageMain}
        />
      ) : (
        <CardMedia>
          <div className={classes.imageMain}>
            {imgLength === 1 ? (
              <img src={images[0].path} className={classes.oneImage} />
            ) : (
              <>
                {images.map((image, idx) => (
                  <>
                    <img
                      key={idx}
                      src={image.path}
                      onClick={() => handleToggle(idx)}
                      className={
                        imgLength === 2
                          ? classes.twoImage
                          : imgLength === 3 && idx === 2
                          ? classes.threeImage
                          : imgLength === 3
                          ? classes.fourImage
                          : classes.fourImage
                      }
                    />
                    <Backdrop className={classes.backdrop} open={open}>
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
                      <div>
                        <img
                          src={currentImage}
                          className={classes.backdropImage}
                        />
                        <h3 className={classes.imageCount}>
                          {currentIndex + 1 + '/' + imgLength}
                        </h3>
                      </div>
                      <Box position="absolute" top={325} right={20}>
                        {currentIndex !== imgLength - 1 && (
                          <div onClick={() => add(currentIndex)}>
                            <IconButton
                              color="primary"
                              className={classes.iconButtonBg}
                            >
                              <ChevronRight
                                className={classes.white}
                                fontSize="large"
                              />
                            </IconButton>
                          </div>
                        )}
                      </Box>
                      <Box position="absolute" top={325} left={20}>
                        {currentIndex !== 0 && (
                          <div onClick={() => back(currentIndex)}>
                            <IconButton
                              color="primary"
                              className={classes.iconButtonBg}
                            >
                              <ChevronLeft
                                className={classes.white}
                                fontSize="large"
                              />
                            </IconButton>
                          </div>
                        )}
                      </Box>
                    </Backdrop>
                  </>
                ))}
              </>
            )}
          </div>
        </CardMedia>
      )}
    </>
  )
}
