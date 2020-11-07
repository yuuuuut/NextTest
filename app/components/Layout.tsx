import React, { useContext } from 'react';

import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Avatar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    ListItemIcon,
    ListItemText,
    MenuProps,
    Divider,
} from '@material-ui/core'

import {
    AccountCircle,
    ExitToApp
} from '@material-ui/icons';

import { User }        from '../models/User';
import { AuthContext } from '../contexts/auth';

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

type LayoutContextType = {
    user: User
}

export const Layout = ({ children }) => {
    /* Material-UI */
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    /* */
    const { user }: LayoutContextType = useContext(AuthContext)

    return (
        <div >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Photos
                    </Typography>
                    {user && (
                        <div className={classes.toolbarButtons}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar src={user.photoURL} alt="User Image" />
                            </IconButton>
                            <StyledMenu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <AccountCircle fontSize="default" />
                                    </ListItemIcon>
                                    <ListItemText primary="マイページ" />
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <ExitToApp fontSize="default" />
                                    </ListItemIcon>
                                    <ListItemText primary="ログアウト" />
                                </MenuItem>
                            </StyledMenu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <div>{children}</div>
        </div>
    );
}