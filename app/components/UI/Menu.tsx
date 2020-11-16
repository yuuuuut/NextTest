import React from 'react'
import Link from 'next/link'

import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuProps,
  withStyles,
} from '@material-ui/core'

import { AccountCircle, ExitToApp } from '@material-ui/icons'

/** Styles */
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d3d3',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

/** Functions */
const LinkMenuItem = React.forwardRef<HTMLAnchorElement, LinkMenuItemProps>(
  function LinkMenuItem(props, forwardedRef) {
    const { href, ...other } = props

    return (
      <Link href={href}>
        <MenuItem component="a" button ref={forwardedRef} {...other} />
      </Link>
    )
  }
)

/** Types */
type LinkMenuItemProps = Omit<
  MenuItemProps<'a', { href: string }>,
  'component' | 'button'
>

type MenuKitProps = {
  anchorEl: null | HTMLElement
  uid: string
  handleClose: () => void
  handleLogout: () => void
}

/** Main */
export const MenuKit = (props: MenuKitProps) => {
  return (
    <StyledMenu
      id="menu-appbar"
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      onClose={props.handleClose}
    >
      <LinkMenuItem href={`/users/${props.uid}`}>
        <ListItemIcon>
          <AccountCircle fontSize="default" />
        </ListItemIcon>
        <ListItemText primary="マイページ" />
      </LinkMenuItem>
      <Divider />
      <MenuItem onClick={props.handleLogout}>
        <ListItemIcon>
          <ExitToApp fontSize="default" />
        </ListItemIcon>
        <ListItemText primary="ログアウト" />
      </MenuItem>
    </StyledMenu>
  )
}
