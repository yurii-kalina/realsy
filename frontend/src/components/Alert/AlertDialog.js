import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function AlertDialog ({ title, description, submitText, cancelText, submitHandler, open, setAlertOpen }) {
  const submitAlert = () => {
    setAlertOpen(false)
    submitHandler()
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setAlertOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlertOpen(false)} color="secondary">
            {cancelText}
          </Button>
          <Button onClick={submitAlert} color="primary" autoFocus>
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
