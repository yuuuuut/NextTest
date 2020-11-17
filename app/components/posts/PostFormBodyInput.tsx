import {
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'

import { useForm } from 'react-hook-form'

/** Styles */
const useStyles = makeStyles(() =>
  createStyles({
    positionRight: {
      marginRight: '1px;',
      textAlign: 'right',
    },
  })
)

/** Types */
type PostFormBodyInputProps = {
  body: string
  maxBody: number
  setBody: Function
}

/** Main */
export const PostFormBodyInput = (props: PostFormBodyInputProps) => {
  const classes = useStyles()
  const { register } = useForm<FormData>()

  const bodyLength = props.body.length
  const maxBody = props.maxBody

  return (
    <>
      <TextField
        fullWidth={true}
        id="outlined-multiline-static"
        label="本文"
        name="body"
        multiline
        rows={5}
        variant="outlined"
        value={props.body}
        inputRef={register({ maxLength: maxBody })}
        error={Boolean(bodyLength > maxBody)}
        helperText={
          bodyLength > maxBody && `タイトルは${maxBody}文字以内にして下さい。`
        }
        onChange={(e) => props.setBody(e.target.value)}
      />
      <Typography
        className={classes.positionRight}
        variant="button"
        display="block"
        gutterBottom
      >
        {bodyLength}/100
      </Typography>
    </>
  )
}
