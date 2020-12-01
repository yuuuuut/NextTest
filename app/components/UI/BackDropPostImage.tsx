import { makeStyles } from '@material-ui/core'

/** Style */
const useStyles = makeStyles(() => ({
  backdropImage: {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
  },
}))

/** Types */
type BackDropPostImageProps = {
  path: string
}

/** Main */
export const BackDropPostImage = (props: BackDropPostImageProps) => {
  const classes = useStyles()

  return (
    <div>
      <img src={props.path} className={classes.backdropImage} />
    </div>
  )
}
