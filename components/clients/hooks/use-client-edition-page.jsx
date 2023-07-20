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

  const id = searchParams.get('national-id')

  const [formValues, setFormValues] = useState({
    nationalId: '',
    fullName: '',
    mainPhoneNo: '',
    secondaryPhoneNo: '',
    email: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const inputs = [
    {
      label: 'Nombre',
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      label: 'Nro. Telefónico',
      name: 'mainPhoneNo',
      type: 'text',
      required: true,
    },
    {
      label: 'Nro. Telefónico secundario',
      name: 'secondaryPhoneNo',
      type: 'text',
      required: true,
    },
    {
      label: 'Correo electrónico',
      name: 'email',
      type: 'email',
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

  const fetchClientData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.clients}/view?national-id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedClientData = responseData.data

      setFormValues(fetchedClientData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del cliente.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])

  useEffect(() => {
    fetchClientData()
  }, [fetchClientData])

  const editVehicle = async () => {
    try {
      const { nationalId, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.clients}?national-id=${nationalId}`,
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
        message: '¡Se ha editado el cliente exitosamente!',
        severity: 'success',
      })

      router.push('/clients')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el cliente.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editVehicle()
  }

  useEffect(() => {
    fetchClientData()
  }, [fetchClientData])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
    isLoading,
    id,
  }
}
