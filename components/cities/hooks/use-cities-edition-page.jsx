'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useCitiesEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const cityNumber = searchParams.get('city-number')
  const stateId = searchParams.get('state-id')

  const [formValues, setFormValues] = useState({
    cityNumber: '',
    name: '',
    stateId: '',
  })
  const [statesList, setStatesList] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const id = useMemo(
    () => `${formValues.stateId}/${formValues.cityNumber}`,
    [formValues]
  )

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
      required: true,
    },
    {
      label: 'Estado:',
      type: 'select',
      options: statesList.map(state => ({
        label: state.name,
        value: state.id,
      })),
      name: 'stateId',
      placeholder: 'Seleccione el estado',
      required: true,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const fetchCityData = useCallback(async () => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.cities}/view?city-number=${cityNumber}&state-id=${stateId}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedCityData = responseData.data

      setFormValues(fetchedCityData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la ciudad.',
        severity: 'error',
      })
    }
  }, [notify, cityNumber, stateId])

  const fetchStatesList = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.states}`, {
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

  const editCity = async () => {
    try {
      const { cityNumber, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.cities}?city-number=${cityNumber}&state-id=${stateId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toEditValues),
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado la ciudad exitosamente!',
        severity: 'success',
      })

      router.push('/cities')
    } catch (error) {
      notify({
        message: 'Error al intentar editar la ciudad.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editCity()
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await fetchCityData()
      await fetchStatesList()
      setIsLoading(false)
    })()
  }, [fetchCityData, fetchStatesList])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id, statesList }
}
