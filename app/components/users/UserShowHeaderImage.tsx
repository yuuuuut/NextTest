import { useState } from 'react'

import { Backdrop, makeStyles } from '@material-ui/core'

import { AvatarKit } from '../UI/Avatar'
import { User } from '../../models/User'

/** Styles */
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

/** Types */
type UserShowHeaderImageProps = {
  user: User
}

/** Main */
export const UserShowHeaderImage = (props: UserShowHeaderImageProps) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const user = props.user

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <>
      <div onClick={handleToggle}>
        <AvatarKit src={user.photoURL} class={'large'} />
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <AvatarKit src={user.photoURL} class={'big'} />
      </Backdrop>
    </>
  )
}
