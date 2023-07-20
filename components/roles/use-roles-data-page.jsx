import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useRolesDataPage() {
  const notify = useSnackbar()

  const [roles, setRoles] = useState([])

  const columns = {
    id: 'ID',
    name: 'Nombre',
    description: 'Descripción'
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'id': row.id },
      }
    })

  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.roles, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedRoles = responseData.data
      const formattedRoles = addIdAttrsObjectToEachRow(fetchedRoles)

      setRoles(formattedRoles)
    } catch (error) {
      notify({
        message: 'Error obteniendo los cargos.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'id': id,
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.roles}?id=${id}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el cargo exitosamente!',
        severity: 'success',
      })

      fetchRoles()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el cargo.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])

  return { roles, columns, handleDelete }
}

