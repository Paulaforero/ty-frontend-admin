import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useCitiesDataPage() {
  const notify = useSnackbar()

  const [supplyLines, setSupplyLines] = useState([])

  const columns = {
    id: 'ID',
    name: 'Nombre',
  }

  const addIdAttrsObject = rows =>
    rows.map(row => {
      return { ...row, idAttrs: { id: row.id } }
    })

  const fetchSupplyLines = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.supplyLines, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedSupplyLines = responseData.data
      
      const formattedSupplyLines = addIdAttrsObject(fetchedSupplyLines)

      setSupplyLines(formattedSupplyLines)
    } catch (error) {
      notify({
        message: 'Error obteniendo las líneas de suministro.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async id => {
    try {
      const response = await fetch(`${BACKEND_URLS.supplyLines}/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado la línea de suministro exitosamente!',
        severity: 'success',
      })

      fetchSupplyLines()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la línea de suministro.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchSupplyLines()
  }, [fetchSupplyLines])

  return { supplyLines, columns, handleDelete }
}
