import { Alert, Snackbar } from '@mui/material'

const { createContext, useState, useCallback } = require('react')

export const SnackbarContext = createContext(null)

export function SnackbarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [snackbarParams, setSnackbarParams] = useState({
    message: 'It works!',
    severity: 'success',
    autoHideDuration: 3000,
  })

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const updateSnackbarParams = useCallback(newParams => {
    setSnackbarParams(prevParams => ({
      message: newParams?.message || prevParams.message,
      severity: newParams?.severity || prevParams.severity,
      autoHideDuration:
        newParams?.autoHideDuration || prevParams.autoHideDuration,
    }))
  }, [])

  return (
    <SnackbarContext.Provider
      value={{ openSnackbar: handleOpen, updateSnackbarParams }}
    >
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
