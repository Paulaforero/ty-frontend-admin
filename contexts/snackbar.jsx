import { Alert, Snackbar } from '@mui/material'

const { createContext, useState } = require('react')

export const SnackbarContext = createContext(null)

export function SnackbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [snackbarParams, setSnackbarParams] = useState({
    message: 'It works!',
    severity: 'success',
    autoHideDuration: 3000,
  })

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const updateSnackbarParams = newParams => {
    setSnackbarParams({
      message: newParams?.message || snackbarParams.message,
      severity: newParams?.severity || snackbarParams.severity,
      autoHideDuration:
        newParams?.autoHideDuration || snackbarParams.autoHideDuration,
    })
  }

  return (
    <SnackbarContext.Provider
      value={{ openSnackbar: handleOpen, updateSnackbarParams }}
    >
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={snackbarParams.autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarParams.severity}
          variant="filled"
        >
          {snackbarParams.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}