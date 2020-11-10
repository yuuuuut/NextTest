import {
    Avatar,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

type AvatarKitProps = {
    src: string
    class?: "large" | "small"
}

export const AvatarKit = (props: AvatarKitProps) => {
    const classes = useStyles();

    return (
        <>
            {props.class === "large" ? (
                <Avatar alt="User Image" src={props.src} className={classes.large} />
            ) : props.class === "small" ? (
                <Avatar alt="User Image" src={props.src} className={classes.small} />
            ) : (
                <Avatar alt="User Image" src={props.src} />
            )}
        </>
    )
}