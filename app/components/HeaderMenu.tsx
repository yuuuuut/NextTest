import React, { useContext, useState } from "react";
import Link from "next/link"

import {
    Avatar,
    createStyles,
    Divider,
    IconButton,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    MenuItemProps,
    MenuProps,
    withStyles
} from "@material-ui/core"

import {
    Skeleton
} from '@material-ui/lab';

import {
    AccountCircle,
    ExitToApp }
from "@material-ui/icons";

import { AuthContext } from "../contexts/auth";

/**
 * Styles
 */
const useStyles = makeStyles(() =>
    createStyles({
        toolbarButtons: {
            marginLeft: 'auto',
            marginRight: '40px'
        }
    }),
);

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d3d3'
    },
}) ((props: MenuProps) => (
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

type LinkMenuItemProps = Omit<MenuItemProps<'a', { href: string }>, 'component' | 'button'>

const LinkMenuItem = React.forwardRef<HTMLAnchorElement, LinkMenuItemProps>(
    function LinkMenuItem(props, forwardedRef) {

        const {
            href,
            ...other
        } = props

        return (
            <Link href={href}>
                <MenuItem component='a' button ref={forwardedRef} {...other}/>
            </Link>
        )
    }
)

export const HeaderMenu = () => {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // React
    const { user, load, signout } = useContext(AuthContext)

    return (
        <div className={classes.toolbarButtons}>
            {user ? (
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {load ? (
                            <Avatar>
                                <Skeleton variant="circle" width={40} height={40} />
                            </Avatar>
                        ) : (
                            <Avatar src={user.photoURL} alt="User Image" />
                        )}
                    </IconButton>
                    <StyledMenu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                    >
                        <LinkMenuItem href={`/users/${user.uid}`}>
                                <ListItemIcon>
                                    <AccountCircle fontSize="default" />
                                </ListItemIcon>
                                <ListItemText primary="マイページ" />
                        </LinkMenuItem>
                        <Divider />
                        <MenuItem onClick={signout}>
                            <ListItemIcon>
                                <ExitToApp fontSize="default" />
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </MenuItem>
                    </StyledMenu>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}