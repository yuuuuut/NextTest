import { 
    Card,
    CardActions,
    CardMedia,
    makeStyles,
} from "@material-ui/core"

import DeleteIcon from '@material-ui/icons/Delete';

/** Styles */
const useStyles = makeStyles(() => ({
    root: {
        width: '50%',
    },
    media: {
        height: 0,
        paddingTop: '80%',
    },
}));

/** Types */
type PostFormImagePreviewProps = {
    id: string
    path: string
    delete: (id: string) => void
}

/** Main */
export const PostFormImagePreview = (props: PostFormImagePreviewProps) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.path}
                title="Paella dish"
            />
            <CardActions>
                <DeleteIcon
                    color="secondary"
                    onClick={() => props.delete(props.id)}
                />
            </CardActions>
        </Card>
    )
}