'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useRoleCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
  })

  const createRole = async () => {
    try {
      const response = await fetch(BACKEND_URLS.roles, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/roles')

      notify({
        message: '¡Cargo creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el cargo...',
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
    {
        label: 'Descripción',
        type: 'text',
        name: 'description',
        required: true,
      },
    
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createRole()
  }

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
