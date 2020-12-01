import { useState } from 'react'

import { Menu, MenuItem } from '@material-ui/core'

import { ConfirmationDelete } from '../UI/ConfirmationDelete'

/** Types */
type PostCardMenuProps = {
  id: string
  anchorEl: null | HTMLElement
  handleClose: () => void
}

/** Main */
export const PostCardMenu = (props: PostCardMenuProps) => {
  const anchorEl = props.anchorEl
  const handleClose = props.handleClose

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    handleClose()
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClickOpen}>削除</MenuItem>
      <ConfirmationDelete
        id={props.id}
        open={open}
        handleDialogClose={handleDialogClose}
      />
    </Menu>
  )
}
