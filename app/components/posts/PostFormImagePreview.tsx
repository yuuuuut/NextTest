import { 
    Card,
    CardActions,
    CardMedia,
    makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles(() => ({
    root: {
        width: '50%',
    },
    media: {
        height: 0,
        paddingTop: '80%',
    },
}));

type PostFormImagePreviewProps = {
    path: string
}

export const PostFormImagePreview = (props: PostFormImagePreviewProps) => {
    const classes = useStyles();

    return (
        <>
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.path}
                title="Paella dish"
            />
            <CardActions>
                削除
            </CardActions>
        </Card>
    </>
    )
}