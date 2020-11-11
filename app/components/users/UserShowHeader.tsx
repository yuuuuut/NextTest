import {
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core'

import {
    Skeleton
} from '@material-ui/lab'

import { User } from '../../models/User';
import { UserShowHeaderImage } from './UserShowHeaderImage';

const useStyles = makeStyles((theme) => ({
    mt2: {
        marginTop: theme.spacing(2)
    },
    mt4: {
        marginTop: theme.spacing(4)
    }
}));

type UserShowHeaderProps = {
    user: User
    load: boolean
}

export const UserShowHeader = (props: UserShowHeaderProps) => {
    const classes = useStyles();

    const user = props.user
    const load = props.load

    return (
        <>
            <Grid container alignItems="center" justify="center">
                <Grid item className={classes.mt4}>
                    {load ? (
                        <Skeleton variant="circle"  width={96} height={96} />
                    ) : (
                        <UserShowHeaderImage user={user} />
                    )}
                </Grid>
            </Grid>
            <Grid container alignItems="center" justify="center">
                <Grid item className={classes.mt2}>
                    <Typography variant="h3">
                        {load ? <Skeleton /> : user.displayName}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}