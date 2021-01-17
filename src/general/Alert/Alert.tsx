import React from 'react'
import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

type AlertProps = {
  message: string,
  open: boolean,
  onClose: () => void
}

// A pop-up toast that disable after 6 seconds
const Alert = (props: AlertProps) => {
  const { message, open, onClose } = props

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      ContentProps={{
        style: {
          backgroundColor: '#f44336',
          fontWeight: 700
        }
      }}
      message={message}
      action={
        <IconButton onClick={onClose}>
          <CloseIcon style={{color: '#ffffff'}} />
        </IconButton>
      }
    />
  )
}

export default Alert