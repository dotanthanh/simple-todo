import React, { useState } from 'react'
import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

type AlertProps = {
  message: string
}

// A pop-up toast that disable after 6 seconds
const Alert = ({ message }: AlertProps) => {
  const [open, setOpen] = useState(true)

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      ContentProps={{
        style: { backgroundColor: '#f44336' }
      }}
      message={message}
      action={
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon style={{color: '#ffffff'}} />
        </IconButton>
      }
    />
  )
}

export default Alert