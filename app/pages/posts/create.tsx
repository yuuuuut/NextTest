import { FormEvent, useEffect, useState } from "react"

import {
    Button,
    LinearProgress,
    makeStyles,
    TextField
} from "@material-ui/core"

import { PostFormImage } from "../../components/posts/PostFormImage"
import { Layout } from "../../components/Layout"
import { toast } from "react-toastify"
import firebase from 'firebase/app'

/** Styles */
const useStyles = makeStyles(() => ({
    progress: {
        width: '100%'
    },
    container: {
        margin: '0 auto',
        marginTop: '20px',
        maxWidth: '400px',
        padding: '1rem',
        height: 'auto',
        width: 'calc(100% - 2rem)',
    },
    containerM: {
        marginTop: '10px',
        marginBottom: '10px',
    }
}))

/** Main */
const Create = () => {
    const classes = useStyles();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [isSending, setIsSending] = useState(false)

    function upload(e) {
        e.preventDefault()

        previewImages.map(image => {
            const uploadRef  = firebase.storage().ref('images').child(image.id)
            const uploadTask = uploadRef.put(image.blob)

            uploadTask.then(() => {
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((url: string) => {
                        const n = {
                            id: image.id,
                            path: url,
                        }

                        setImages(((prevState) => [...prevState, n]))
                    })
            }).catch(() => {
                alert('エラーが発生しました。')
            })
        })
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsSending(true)

        await firebase.firestore().collection('posts').add({
            userId: firebase.auth().currentUser.uid,
            title,
            images: images,
            body,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setIsSending(false)

        toast.success('投稿しました。', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        
        setPreviewImages([])
        setImages([])
    }

    useEffect(() => {
        console.log(images)
    }, [images, setImages])

    return (
        <Layout>
            <div className={classes.container}>
                <form onSubmit={onSubmit}>
                    <TextField
                        fullWidth={true}
                        id="outlined-multiline-flexible"
                        label="タイトル"
                        multiline
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className={classes.containerM}>
                        <TextField
                            fullWidth={true}
                            id="outlined-multiline-static"
                            label="本文"
                            multiline
                            rows={5}
                            variant="outlined"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <PostFormImage
                        images={images}
                        setImages={setImages}
                        previewImages={previewImages}
                        setPreviewImages={setPreviewImages}
                    />
                    <div className={classes.containerM}>
                        {isSending ? (
                            <div className={classes.progress}>
                                <LinearProgress />
                            </div>
                        ) : (
                            <Button
                            type="submit"
                            fullWidth={true}
                            variant="outlined"
                            color="primary"
                            >
                                投稿
                            </Button>
                        )}

                            <Button
                                onClick={upload}
                                type="submit"
                                fullWidth={true}
                                variant="outlined"
                                color="primary"
                            >
                                アップロード
                            </Button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .container {
                    margin: 0 auto;
                    margin-top: 20px;
                    max-width: 400px;
                    padding: 1rem;
                    height: auto;
                    width: calc(100% - 2rem);
                }

                .container-m {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            `}</style>
        </Layout>
    )
}

export default Create