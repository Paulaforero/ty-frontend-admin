'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useStateCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    name: '',
  })

  const createState = async () => {
    try {
      const response = await fetch(BACKEND_URLS.states, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/states')

      notify({
        message: '¡Estado creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el estado...',
        severity: 'error',
      })
    }
  }

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

  const handleSubmit = e => {
    e.preventDefault()
    createState()
  }

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}

