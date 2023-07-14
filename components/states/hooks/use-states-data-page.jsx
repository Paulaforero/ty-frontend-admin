import { useState, useCallback, useEffect } from 'react'
import useSnackbar from '@/hooks/use-snackbar'
import { states } from '@/mock/states'

export default function useStatesDataPage() {
  const notify = useSnackbar()


  const columns = {
    id: 'ID',
    name: 'Nombre',
  }

  return { columns, states }
}