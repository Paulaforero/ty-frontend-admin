'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useSupplyLineDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [supplyLineData, setSupplyLineData] = useState({
    id: '',
    name: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'ID',
        value: supplyLineData.id,
      },
      {
        label: 'Nombre',
        value: supplyLineData.name,
      },
    ],
    [supplyLineData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.supplyLines}?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡La línea de suministro se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/supply-lines')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la línea de suministro.',
        severity: 'error',
      })
    }
  }

  const fetchSupplyLineData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URLS.supplyLines}/view?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const fetchedCityData = await response.json()

      setSupplyLineData(fetchedCityData.data)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la línea de suministro.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [id, notify])

  useEffect(() => {
    fetchSupplyLineData()
  }, [fetchSupplyLineData])

  return { rows, isLoading, handleDelete, id }
}