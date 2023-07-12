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

  const updateSnackbarParams = useCallback(newParams => {
    setSnackbarParams(prevSnackbarParams => ({
      message: newParams?.message || prevSnackbarParams.message,
      severity: newParams?.severity || prevSnackbarParams.severity,
      autoHideDuration:
        newParams?.autoHideDuration || prevSnackbarParams.autoHideDuration,
    }))
  }, [])

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
