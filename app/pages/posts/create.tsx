import { useState } from 'react'

import { LinearProgress, makeStyles } from '@material-ui/core'

import { PostFormBodyInput } from '../../components/posts/PostFormBodyInput'
import { PostFormButton } from '../../components/posts/PostFormButton'
import { PostFormImage } from '../../components/posts/PostFormImage'

import { Image, PreviewImage } from '../../models/Post'
import { toast } from 'react-toastify'
import firebase from 'firebase/app'

/** Styles */
const useStyles = makeStyles(() => ({
  progress: {
    width: '100%',
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
  },
}))

/** Main */
const Create = () => {
  const classes = useStyles()

  const [body, setBody] = useState('')
  const maxBody = 100
  const [previewImages, setPreviewImages] = useState<Array<PreviewImage>>([])
  const [isSending, setIsSending] = useState(false)

  /**
   * 画像をstorage上にアップロードし、postsとしてfirestoreに保存する
   */
  const upload = async () => {
    setIsSending(true)

    const images: Array<Image> = []

    try {
      await Promise.all(
        previewImages.map(async (image) => {
          const uploadRef = firebase.storage().ref('images').child(image.id)
          const uploadTask = uploadRef.put(image.blob)

          const snapshot = await uploadTask
          const url: string = await snapshot.ref.getDownloadURL()

          const newImage = {
            id: image.id,
            path: url,
          }
          images.push(newImage)
        })
      )

      await firebase.firestore().collection('posts').add({
        userId: firebase.auth().currentUser?.uid,
        images: images,
        body,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })

      setPreviewImages([])
      setBody('')
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
    } catch (e) {
      alert('エラーが発生しました。')
      setIsSending(false)
    }
  }

  return (
    <>
      <div className={classes.container}>
        <form>
          <div className={classes.containerM}>
            <PostFormBodyInput
              body={body}
              maxBody={maxBody}
              setBody={setBody}
            />
          </div>
          <div className={classes.containerM}>
            <PostFormImage
              previewImages={previewImages}
              setPreviewImages={setPreviewImages}
            />
          </div>
          <div className={classes.containerM}>
            {isSending ? (
              <div className={classes.progress}>
                <LinearProgress />
              </div>
            ) : (
              <PostFormButton body={body} maxBody={maxBody} upload={upload} />
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps = async () => ({
  props: {
    authPage: true,
  },
})

export default Create
