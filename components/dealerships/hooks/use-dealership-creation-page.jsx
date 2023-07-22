'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'
import { states } from '@/mock/cities'

export default function useDealershipCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    rif: '',
    name: '',
    cityNumber: '',
    stateId: '',
  })

  const [citiesList, setCitiesList] = useState([])
  const [statesList, setStatesList] = useState([])

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

  const fetchStatesList = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.states, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedStatesList = responseData.data

      setStatesList(fetchedStatesList)
    } catch (error) {
      notify({
        message: 'Error obteniendo la lista de estados.',
        severity: 'error',
      })
    }
  }, [notify])

  const createDealership = async () => {
    try {
      const response = await fetch(BACKEND_URLS.dealerships, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/dealerships')

      notify({
        message: '¡Concesionario creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el concesionario...',
        severity: 'error',
      })
    }
  }

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
      label: 'Estado',
      name: 'stateId',
      type: 'select',
      required: true,
      options: statesList.map(state => {
        return {
          label: state.name,
          value: state.id,
        }
      }),
    },
    {
      label: 'Ciudad',
      name: 'cityNumber',
      type: 'select',
      required: true,
      options: citiesList
        .filter(city => city.stateId === formValues.stateId)
        .map(city => {
          return {
            label: city.name,
            value: city.cityNumber,
          }
        }),
    },
  ]

  const handleChange = event => {
    console.log(event.target.name, event.target.value)

    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createDealership()
  }

  useEffect(() => {
    fetchStatesList()
    fetchCitiesList()
  }, [fetchCitiesList, fetchStatesList])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
