import { useCallback } from "react"

import {
    Chip,
    createStyles,
    makeStyles }
from "@material-ui/core"

import {
    PhotoCamera
} from "@material-ui/icons"

import { PostFormImagePreview } from "./PostFormImagePreview"
import { Image } from "../../models/Post"
import firebase from 'firebase/app'

/** Styles */
const useStyles = makeStyles(() =>
    createStyles({
        imageList: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
        },
        mt: {
            marginTop: '8px',
        },
        input: {
            display: 'none',
        }
    })
);

/** Types */
type PostFormImageProps = {
    images: Array<Image>
    setImages: Function
}

/** Main */
export const PostFormImage = (props: PostFormImageProps) => {
    const classes = useStyles()

    const upload = useCallback((e) => {
        const file = e.target.files

        const blob = new Blob(file, { type: "image/jpeg" })

        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[ n % S.length]).join('')

        const uploadRef = firebase.storage().ref('images').child(fileName)
        const uploadTask = uploadRef.put(blob)

        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then((url: string) => {
                    const newImage = {
                        id: fileName,
                        path: url,
                    }
                    props.setImages(((prevState: Array<Image>) => [...prevState, newImage]))
                })
        }).catch(() => {
            alert('エラーが発生しました。')
        })
    }, [props.setImages])

    return (
        <div>
            <div className={classes.imageList}>
                {props.images.length > 0 && (
                    props.images.map(image =>
                        <PostFormImagePreview
                            path={image.path}
                            key={image.id}
                        />
                    )
                )}
            </div>

            {props.images.length < 4 && (
                <div>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => upload(e)}
                    />
                    <label htmlFor="icon-button-file">
                        <Chip
                            className={classes.mt}
                            icon={<PhotoCamera />}
                            label="画像を追加"
                            variant="outlined"
                        />
                    </label>
                </div>
            )}
        </div>
    )
}