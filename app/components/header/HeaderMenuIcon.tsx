import React, { useContext, useState } from 'react'

import { createStyles, IconButton, makeStyles } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

import { AuthContext } from '../../contexts/auth'
import { HeaderMenu } from './HeaderMenu'
import { AvatarKit } from '../UI/Avatar'

/** Styles */
const useStyles = makeStyles(() =>
  createStyles({
    toolbarButtons: {
      marginLeft: 'auto',
      marginRight: '20px',
    },
  })
)

/** Main */
export const HeaderMenuIcon = () => {
  const classes = useStyles()

  const { user, load, signout } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  /**
   * ログアウトしてanchorElをnullにする
   */
  const handleLogout = () => {
    signout && signout()
    setAnchorEl(null)
  }

  return (
    <div className={classes.toolbarButtons}>
      <div>
        <IconButton
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {load ? (
            <Skeleton variant="circle" width={40} height={40} />
          ) : (
            <AvatarKit src={user?.photoURL} />
          )}
        </IconButton>
        <HeaderMenu
          anchorEl={anchorEl}
          uid={user?.uid}
          handleClose={handleClose}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  )
}
