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
    MenuProps,
    withStyles
} from "@material-ui/core"

import {
    AccountCircle,
    ExitToApp }
from "@material-ui/icons";

import { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth";
import { User } from "../models/User";

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

type Props = {
    user: User
}

export const HeaderMenu: React.FC<Props> = ({ user }) => {
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
    const { signout } = useContext(AuthContext)

    return (
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
                <MenuItem onClick={signout}>
                    <ListItemIcon>
                        <ExitToApp fontSize="default" />
                    </ListItemIcon>
                    <ListItemText primary="ログアウト" />
                </MenuItem>
            </StyledMenu>
        </div>
    )
}