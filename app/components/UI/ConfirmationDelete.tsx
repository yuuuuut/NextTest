import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

/** Types */
type ConfirmationDeleteProps = {
  id: string
  open: boolean
  handleDialogClose: () => void
}

/** Main */
export const ConfirmationDelete = (props: ConfirmationDeleteProps) => {
  const open = props.open
  const handleDialogClose = props.handleDialogClose

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'本当に投稿を削除しますか?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleDialogClose} color="primary" autoFocus>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  )
}
