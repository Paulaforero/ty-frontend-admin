import { SnackbarContext } from '@/contexts/snackbar'
import { useCallback, useContext } from 'react'

export default function useSnackbar() {
  const { openSnackbar, updateSnackbarParams } = useContext(SnackbarContext)

  const handleNotification = useCallback(snackbarParams => {
    updateSnackbarParams(snackbarParams)
    openSnackbar()
  },[openSnackbar, updateSnackbarParams])

  return handleNotification
}
