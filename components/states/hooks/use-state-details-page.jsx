'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useClientDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [stateData, setStateData] = useState({
    id,
    name: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const rows = useMemo(
    () => [
      {
        label: 'Nombre',
        value: stateData.name,
      },
    ],
    [stateData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.states}?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El estado se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/states')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el estado.',
        severity: 'error',
      })
    }
  }

  const fetchStateData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URLS.states}/view?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedStateData = responseData.data
      setStateData(fetchedStateData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del estado.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])

  useEffect(() => {
    fetchStateData()
  }, [fetchStateData])

  return {
    rows,
    stateData,
    handleDelete,
    isLoading,
    id,
  }
}
