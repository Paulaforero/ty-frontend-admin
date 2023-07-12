import { SnackbarContext } from '@/contexts/snackbar'
import { useContext } from 'react'

export default function useSnackbar() {
  const { openSnackbar, updateSnackbarParams } = useContext(SnackbarContext)

  const handleNotification = snackbarParams => {
    updateSnackbarParams(snackbarParams)
    openSnackbar()
  }

  return handleNotification
}
