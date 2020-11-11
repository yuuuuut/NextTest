import { useState } from "react"
import {
    Backdrop,
    makeStyles
} from "@material-ui/core"

import { User } from "../../models/User";
import { AvatarKit } from "../UI/Avatar"

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

type UserShowHeaderImageProps = {
    user: User
}

export const UserShowHeaderImage = (props: UserShowHeaderImageProps) => {
    const classes = useStyles();

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
                <AvatarKit
                    src={user.photoURL}
                    class={"large"}
                />
            </div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <AvatarKit src={user.photoURL} class={'big'} />
            </Backdrop>
        </>
    )
}