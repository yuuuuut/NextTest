import { Avatar, makeStyles } from '@material-ui/core'

/** Styles */
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  big: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}))

/** Types */
type AvatarKitProps = {
  src: string | undefined
  class?: 'big' | 'large' | 'small'
  onClick?: () => void
}

export const AvatarKit = (props: AvatarKitProps) => {
  const classes = useStyles()

  return (
    <>
      {props.class === 'big' ? (
        <Avatar alt="User Image" src={props.src} className={classes.big} />
      ) : props.class === 'large' ? (
        <Avatar alt="User Image" src={props.src} className={classes.large} />
      ) : props.class === 'small' ? (
        <Avatar alt="User Image" src={props.src} className={classes.small} />
      ) : (
        <Avatar alt="User Image" src={props.src} />
      )}
    </>
  )
}
