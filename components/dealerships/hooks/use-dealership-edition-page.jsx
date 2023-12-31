'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useDealershipEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const rif = searchParams.get('rif')
  const id = rif

  const [formValues, setFormValues] = useState({
    rif: '',
    name: '',
    cityNumber: '',
    stateId: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const [citiesList, setCitiesList] = useState([])

  const inputs = [
    {
      label: 'Rif',
      name: 'rif',
      type: 'text',
      required: true,
    },
    {
      label: 'Nombre',
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: 'Ciudad',
      name: 'cityNumber',
      type: 'select',
      required: true,
      options: citiesList.map(city => {
        return {
          label: city.name,
          value: city.cityNumber,
        }
      }),
    },
  ]

  const handleChange = event => {
    setFormValues({
      ...formValues,
      [event.target.name]:
        typeof event.target.value === 'string'
          ? event.target.value.trim()
          : event.target.value,
    })
  }

  const fetchCitiesList = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.cities, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedCitiesList = responseData.data

      setCitiesList(fetchedCitiesList)
    } catch (error) {
      notify({
        message: 'Error obteniendo la lista de ciudades.',
        severity: 'error',
      })
    }
  }, [notify])

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

  const editDealership = async () => {
    try {
      const { rif, ...toEditValues } = formValues
      const response = await fetch(`${BACKEND_URLS.dealerships}?rif=${rif}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toEditValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado el concesionario exitosamente!',
        severity: 'success',
      })

      router.push('/dealerships')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el concesionario.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editDealership()
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await fetchDealershipData()
      await fetchCitiesList()
      setIsLoading(false)
    })()
  }, [fetchDealershipData, fetchCitiesList])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
    isLoading,
    id,
  }
}
