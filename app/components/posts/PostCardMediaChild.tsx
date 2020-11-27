import { useState } from 'react'

import { createStyles, makeStyles } from '@material-ui/core'

import { PostCardMediaPreview } from './PostCardMediaPreview'
import { Image } from '../../models/Post'

/** Style */
const useStyles = makeStyles(() =>
  createStyles({
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
  })
)

/** Types */
type PostCardMediaChildProps = {
  images: Array<Image>
  imgLength: number
  image: Image
  idx: number
}

/** Main */
export const PostCardMediaChild = (props: PostCardMediaChildProps) => {
  const classes = useStyles()

  const imgLength = props.imgLength
  const images = props.images
  const image = props.image
  const idx = props.idx

  const [currentImage, setCurrentImage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)

  /**
   * styleAttributeを設定して、currentIndex・currentImageをセット、
   * openを反転させる
   * @param idx
   */
  const handleToggle = (idx: number) => {
    document.body.setAttribute('style', 'overflow: hidden;')

    setCurrentIndex(idx)
    setCurrentImage(images[idx].path)
    setOpen(!open)
  }

  /**
   * styleAttributeを削除してopenをfalseに
   */
  const handleClose = () => {
    document.body.removeAttribute('style')
    setOpen(false)
  }

  /**
   * 現在のimages[index]に + 1 して次の画像をセットする
   * @param id
   */
  const add = (id: number) => {
    setCurrentImage(images[id + 1].path)
    setCurrentIndex(id + 1)
  }

  /**
   * 現在のimages[index]に - 1 して前の画像をセットする
   * @param id
   */
  const back = (id: number) => {
    setCurrentImage(images[id - 1].path)
    setCurrentIndex(id - 1)
  }

  return (
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
      <PostCardMediaPreview
        open={open}
        imgLength={imgLength}
        currentImage={currentImage}
        currentIndex={currentIndex}
        handleClose={handleClose}
        add={add}
        back={back}
      />
    </>
  )
}
