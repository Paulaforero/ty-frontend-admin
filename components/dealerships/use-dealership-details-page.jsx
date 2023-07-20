'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useDealershipDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const rif = searchParams.get('rif')

  const id = rif

  const [dealershipData, setDealershipData] = useState({
    rif: '',
    name: '',
    cityNumber: '',
    stateId: '',
    managerNationalId: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const rows = useMemo(
    () => [
      {
        label: 'Rif:',
        value: dealershipData.rif,
      },
      {
        label: 'Nombre:',
        value: dealershipData.name,
      },
      {
        label: 'Ciudad:',
        value: dealershipData.cityNumber,
      },
      {
        label: 'State:',
        value: dealershipData.stateId,
      },
      {
        label: 'Manager:',
        value: dealershipData.managerNationalId,
      },
    ],
    [dealershipData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.dealerships}?rif=${rif}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El concesionario se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/dealerships')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el concesionario.',
        severity: 'error',
      })
    }
  }

  const fetchDealershipData = useCallback(async () => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.dealerships}/view?rif=${rif}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedDealershipData = responseData.data

      setFormValues(fetchedDealershipData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del concesionario.',
        severity: 'error',
      })
    }
  }, [notify, rif])

  useEffect(() => {
    fetchDealershipData()
  }, [fetchDealershipData])

  return {
    rows,
    dealershipData,
    handleDelete,
    isLoading,
    id,
  }
}
