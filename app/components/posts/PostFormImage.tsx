import { useCallback } from "react"

import { PostFormImagePreview } from "./PostFormImagePreview"
import { Image } from "../../models/Post"
import firebase from 'firebase/app'

type PostFormImageProps = {
    images: Array<Image>
    setImages: Function
}

export const PostFormImage = (props: PostFormImageProps) => {

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
        }).catch((e) => {
            console.log(e)
        })
    }, [props.setImages])

    return (
        <div>
            <div>
                {props.images.length > 0 && (
                    props.images.map(image => <PostFormImagePreview path={image.path} key={image.id} />)
                )}
            </div>
            <label>
                <div>画像を登録</div>
                <input
                    type="file"
                    id="image"
                    onChange={((e) => upload(e))}
                />
            </label>
            
        </div>
    )
}