import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useDealershipsDataPage() {
  const notify = useSnackbar()

  const [dealerships, setDealerships] = useState([])

  const columns = {
    rif: 'Rif',
    name: 'Nombre',
    cityNumber: 'Ciudad',
    stateId: 'Estado',
    managerNationalId: 'Encargado',
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'national-id': row.nationalId },
      }
    })

  const fetchDealerships = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.dealerships, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedDealerships = responseData.data
      const formattedDealerships = addIdAttrsObjectToEachRow(fetchedDealerships)

      setDealerships(formattedDealerships)
    } catch (error) {
      notify({
        message: 'Error obteniendo los dealerships.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({ 'rif': rif }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.clients}?rif=${rif}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el concesionario exitosamente!',
        severity: 'success',
      })

      fetchDealerships()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el concesionario.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchDealerships()
  }, [fetchDealerships])

  return { dealerships, columns, handleDelete }
}
