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
import { PreviewImage } from "../../models/Post"

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
    previewImages: Array<PreviewImage>
    setPreviewImages: Function
}

/** Main */
export const PostFormImage = (props: PostFormImageProps) => {
    const classes = useStyles()

    const upload = useCallback((e) => {
        const files: Blob = e.target.files.item(0)

        //Blob作成
        const file = e.target.files
        const blob = new Blob(file, { type: "image/jpeg" })

        //fileName作成
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[ n % S.length]).join('')

        if (files) {
            const reader = new FileReader()
        
            reader.onload = () => {
                const previewImage = {
                    id: fileName,
                    path: reader.result,
                    blob: blob,
                }
    
                props.setPreviewImages(((prevState: Array<PreviewImage>) => [...prevState, previewImage]))
            }
            reader.readAsDataURL(files)
        }
    }, [props.previewImages])

    const deleteImage = useCallback((id: string) => {
        const newImages = props.previewImages.filter(image => image.id !== id)

        props.setPreviewImages(newImages)
    }, [props.previewImages])

    return (
        <div>
            <div className={classes.imageList}>
                {props.previewImages.length > 0 && (
                    props.previewImages.map(image =>
                        <PostFormImagePreview
                            id={image.id}
                            path={image.path}
                            key={image.id}
                            delete={deleteImage}
                        />
                    )
                )}
            </div>

            {props.previewImages.length < 4 && (
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