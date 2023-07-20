'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useClientEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [formValues, setFormValues] = useState({
    id,
    name: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const inputs = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'name',
      required: true,
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

  const fetchStateData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URLS.states}/view?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedStateData = responseData.data

      setFormValues(fetchedStateData)
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

  const editState = async () => {
    try {
      const { id, ...toEditValues } = formValues
      const response = await fetch(`${BACKEND_URLS.states}?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toEditValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado el estado exitosamente!',
        severity: 'success',
      })

      router.push('/states')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el estado.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editState()
  }

  useEffect(() => {
    fetchStateData()
  }, [fetchStateData])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
    isLoading,
    id,
  }
}
