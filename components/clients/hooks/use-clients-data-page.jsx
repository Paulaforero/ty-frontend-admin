import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useClientsDataPage() {
  const notify = useSnackbar()

  const [clients, setClients] = useState([])

  const columns = {
    nationalId: 'Cédula',
    fullName: 'Nombre',
    mainPhoneNo: 'Nro. Telefónico',
    secondaryPhoneNo: 'Nro. Telefónico secundario',
    email: 'E-mail',
  }
  
  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'national-id': row.nationalId},
      }
    })

  const fetchClients = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.clients, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedClients = responseData.data
      const formattedClients = addIdAttrsObjectToEachRow(fetchedClients)

      setClients(formattedClients)
    } catch (error) {
      notify({
        message: 'Error obteniendo los clientes.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'national-id': nationalId
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.vehicles}?national-id=${plate}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el cliente exitosamente!',
        severity: 'success',
      })

      fetchClients()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el cliente.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  return { clients, columns, handleDelete }
}

