'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useCityDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [cityData, setCityData] = useState({
    id: '',
    name: '',
    stateId: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'ID:',
        value: cityData.id,
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

  const handleChange = event => {
    setCityData({ ...cityData, [event.target.name]: event.target.value })
  }

  const editCity = async () => {
    try {
      const response = await fetch(BACKEND_URLS.cities, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityData),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/cities')
    } catch (error) {
      console.log(error)
      alert('ERROR')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editCity()
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.cities}/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

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
      const response = await fetch(`${BACKEND_URLS.cities}/${id}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const fetchedCityData = await response.json()

      setCityData(fetchedCityData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la ciudad.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [id, notify])

  useEffect(() => {
    fetchCityData()
  }, [fetchCityData])

  return { rows, cityData, handleChange, handleSubmit, handleDelete, isLoading, id }
}
