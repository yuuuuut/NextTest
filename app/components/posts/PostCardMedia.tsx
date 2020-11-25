import { CardMedia, makeStyles } from '@material-ui/core'
import { Image } from '../../models/Post'

/** Style */
const useStyles = makeStyles({
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
})

/** Types */
type PostCardMediaProps = {
  images: Array<Image>
}

/** Main */
export const PostCardMedia = (props: PostCardMediaProps) => {
  const classes = useStyles()

  const images = props.images
  const imgLength = props.images.length

  return (
    <CardMedia>
      <div className={classes.imageMain}>
        {imgLength === 1 ? (
          <img src={images[0].path} className={classes.oneImage} />
        ) : imgLength === 2 ? (
          <>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.path}
                className={classes.twoImage}
              />
            ))}
          </>
        ) : imgLength === 3 ? (
          <>
            {images.map((image, idx) => (
              <img
                key={image.id}
                src={image.path}
                className={idx === 2 ? classes.threeImage : classes.fourImage}
              />
            ))}
          </>
        ) : (
          <>
            {images.map((image) => (
              <img
                key={image.id}
                src={image.path}
                className={classes.fourImage}
              />
            ))}
          </>
        )}
      </div>
    </CardMedia>
  )
}
