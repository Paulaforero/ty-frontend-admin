'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useClientCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    nationalId: '',
    fullName: '',
    mainPhoneNo: '',
    secondaryPhoneNo: '',
    email: '',
  })

  const createVehicle = async () => {
    try {
      const response = await fetch(BACKEND_URLS.clients, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/clients')

      notify({
        message: '¡Cliente creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el cliente...',
        severity: 'error',
      })
    }
  }

  const inputs = [
    {
      label: 'Cédula',
      name: 'nationalId',
      type: 'text',
      required: true,
    },
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

  const handleSubmit = e => {
    e.preventDefault()
    createVehicle()
  }

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
