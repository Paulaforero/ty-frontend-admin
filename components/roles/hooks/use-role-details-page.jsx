'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useRoleDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [roleData, setRoleData] = useState({
    id: '',
    name: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'ID',
        value: roleData.id,
      },
      {
        label: 'Nombre',
        value: roleData.name,
      },
      {
        label: 'Descripción',
        value: roleData.description,
      },
    ],
    [roleData]
  )

  const handleSubmit = e => {
    e.preventDefault()
    editRole()
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.roles}?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El cargo se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/roles')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el cargo.',
        severity: 'error',
      })
    }
  }

  const fetchRoleData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.roles}/view?id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedRoleData = responseData.data
      setRoleData(fetchedRoleData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del cargo.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])

  useEffect(() => {
    fetchRoleData()
  }, [fetchRoleData])

  return {
    rows,
    roleData,
    handleDelete,
    isLoading,
    id: roleData.id,
  }
}
