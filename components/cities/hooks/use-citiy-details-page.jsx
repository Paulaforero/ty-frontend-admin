'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useCityDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const cityNumber = searchParams.get('city-number')
  const stateId = searchParams.get('state-id')

  const [cityData, setCityData] = useState({
    cityNumber: '',
    name: '',
    stateId: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const id = useMemo(
    () => `${cityData.stateId}/${cityData.cityNumber}`,
    [cityData]
  )

  const rows = useMemo(
    () => [
      {
        label: 'Número de ciudad:',
        value: cityData.cityNumber,
      },
      {
        label: 'Nombre:',
        value: cityData.name,
      },
      {
        label: 'Estado:',
        value: cityData.stateId,
      },
    ],
    [cityData]
  )

  const handleSubmit = e => {
    e.preventDefault()
    editCity()
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.cities}?city-number=${cityNumber}&state-id=${stateId}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡La ciudad se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/cities')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la ciudad.',
        severity: 'error',
      })
    }
  }

  const fetchCityData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.cities}/view?city-number=${cityNumber}&state-id=${stateId}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedCityData = responseData.data
      setCityData(fetchedCityData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la ciudad.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, cityNumber, stateId])

  useEffect(() => {
    fetchCityData()
  }, [fetchCityData])

  return {
    rows,
    cityData,
    handleDelete,
    isLoading,
    id,
  }
}
