import { useCallback } from 'react'

import { Chip, createStyles, makeStyles } from '@material-ui/core'

import { PhotoCamera } from '@material-ui/icons'

import { PostFormImagePreview } from './PostFormImagePreview'
import { PreviewImage } from '../../models/Post'
import Resizer from 'react-image-file-resizer'

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
    },
  })
)

/** Types */
type PostFormImageProps = {
  previewImages: Array<PreviewImage>
  setPreviewImages: Function
}

/** Main */
export const PostFormImage = (props: PostFormImageProps) => {
  const classes = useStyles()

  /**
   * 画像をリサイズする
   * @param file
   */
  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        600,
        600,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri)
        },
        'blob'
      )
    })

  /**
   * 画像をプレビュー表示しPreviewImagesにsetする
   */
  const upload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      //fileName作成
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')

      if (e.target.files) {
        const file = e.target.files[0]
        const blob = (await resizeFile(file)) as Blob

        const reader = new FileReader()

        if (file) {
          reader.onload = () => {
            const previewImage = {
              id: fileName,
              path: reader.result,
              blob: blob,
            }

            props.setPreviewImages((prevState: Array<PreviewImage>) => [
              ...prevState,
              previewImage,
            ])
          }
          reader.readAsDataURL(blob)
        }
      }
    },
    [props.previewImages]
  )

  /**
   * PreviewImagesからidと一致するデータを取り除いた配列を作成
   */
  const deleteImage = useCallback(
    (id: string) => {
      const newImages = props.previewImages.filter((image) => image.id !== id)

      props.setPreviewImages(newImages)
    },
    [props.previewImages]
  )

  return (
    <div>
      <div className={classes.imageList}>
        {props.previewImages.length > 0 &&
          props.previewImages.map((image) => (
            <>
              <PostFormImagePreview
                id={image.id}
                path={image.path}
                key={image.id}
                delete={deleteImage}
              />
            </>
          ))}
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
