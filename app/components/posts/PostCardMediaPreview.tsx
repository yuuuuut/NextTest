import {
  Backdrop,
  Box,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core'

import { ChevronLeft, ChevronRight, Close } from '@material-ui/icons'
import { BackDropPostImage } from '../UI/BackDropPostImage'

/** Style */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
type PostCardMediaPreviewProps = {
  imgLength: number
  open: boolean
  currentImage: string
  currentIndex: number
  handleClose: () => void
  add: (id: number) => void
  back: (id: number) => void
}

/** Main */
export const PostCardMediaPreview = (props: PostCardMediaPreviewProps) => {
  const classes = useStyles()

  const open = props.open
  const imgLength = props.imgLength
  const currentImage = props.currentImage
  const currentIndex = props.currentIndex

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Box position="absolute" top={20} right={30} onClick={props.handleClose}>
        <IconButton className={classes.iconButtonBg}>
          <Close className={classes.white} fontSize="large" />
        </IconButton>
      </Box>
      <BackDropPostImage path={currentImage} />
      <Box position="absolute" top={325} right={20}>
        {currentIndex !== imgLength - 1 && (
          <div onClick={() => props.add(currentIndex)}>
            <IconButton color="primary" className={classes.iconButtonBg}>
              <ChevronRight className={classes.white} fontSize="large" />
            </IconButton>
          </div>
        )}
      </Box>
      <Box position="absolute" top={325} left={20}>
        {currentIndex !== 0 && (
          <div onClick={() => props.back(currentIndex)}>
            <IconButton color="primary" className={classes.iconButtonBg}>
              <ChevronLeft className={classes.white} fontSize="large" />
            </IconButton>
          </div>
        )}
      </Box>
    </Backdrop>
  )
}
