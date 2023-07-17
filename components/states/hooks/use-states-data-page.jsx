import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useClientsDataPage() {
  const notify = useSnackbar()

  const [states, setStates] = useState([])

  const columns = {
    id: 'ID',
    name: 'Nombre',
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { id: row.id },
      }
    })

  const fetchClients = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.states, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedStates = responseData.data
      const formattedStates = addIdAttrsObjectToEachRow(fetchedStates)

      setStates(formattedStates)
    } catch (error) {
      notify({
        message: 'Error obteniendo los estados.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({ id: id }) => {
    try {
      const response = await fetch(`${BACKEND_URLS.states}?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el estado exitosamente!',
        severity: 'success',
      })

      fetchClients()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el estado.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  return { states, columns, handleDelete }
}
