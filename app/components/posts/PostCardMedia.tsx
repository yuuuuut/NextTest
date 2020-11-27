import { CardMedia, createStyles, makeStyles } from '@material-ui/core'

import { PostCardMediaChild } from './PostCardMediaChild'
import { Image } from '../../models/Post'

/** Style */
const useStyles = makeStyles(() =>
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

  return (
    <>
      <CardMedia>
        <div className={classes.imageMain}>
          {imgLength === 1 ? (
            <img src={images[0].path} className={classes.oneImage} />
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
