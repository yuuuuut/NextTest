import { Button } from '@material-ui/core'

/** Types */
type PostFormButtonProps = {
  body: string
  maxBody: number
  upload: () => Promise<void>
}

/** Main */
export const PostFormButton = (props: PostFormButtonProps) => {
  const body = props.body
  const maxBody = props.maxBody

  return (
    <div>
      {body === '' || body.length > maxBody ? (
        <Button fullWidth={true} variant="outlined" color="primary" disabled>
          投稿
        </Button>
      ) : (
        <Button
          data-testid="addButton"
          onClick={props.upload}
          fullWidth={true}
          variant="outlined"
          color="primary"
        >
          投稿
        </Button>
      )}
    </div>
  )
}
