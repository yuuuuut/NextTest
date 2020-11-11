import { useState }  from 'react'

import {
    Backdrop,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core'

import {
    Skeleton
} from '@material-ui/lab'

import { AvatarKit } from '../../components/UI/Avatar'

const useStyles = makeStyles((theme) => ({
    mt2: {
        marginTop: theme.spacing(2)
    },
    mt4: {
        marginTop: theme.spacing(4)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const UserShowHeader = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleToggle = () => {
        setOpen(!open)
    }

    return (
        <>
            <Grid container alignItems="center" justify="center">
                <Grid item className={classes.mt4}>
                    {props.load ? (
                        <Skeleton variant="circle"  width={96} height={96} />
                    ) : (
                        <>
                        <div onClick={handleToggle}>
                        <AvatarKit
                            src={props.user.photoURL}
                            class={"large"}
                        />
                        </div>
                        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                            <img src={props.user.photoURL} />
                        </Backdrop>
                        </>
                    )}
                </Grid>
            </Grid>
            <Grid container alignItems="center" justify="center">
                <Grid item className={classes.mt2}>
                <Typography variant="h3">
                    {props.load ? <Skeleton /> : props.user.displayName}
                </Typography>
                </Grid>
            </Grid>
        </>
    )
}