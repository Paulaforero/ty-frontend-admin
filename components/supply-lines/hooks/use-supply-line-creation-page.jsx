'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useSupplyLineCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    name: '',
  })

  const createSupplyLine = async () => {
    try {
      const response = await fetch(BACKEND_URLS.supplyLines, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/supply-lines')

      notify({
        message: '!Línea de suministro creada con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear la línea de suministro...',
        severity: 'error',
      })
    }
  }

  const inputs = [
    {
      label: 'Nombre',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
      required: true,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createSupplyLine()
  }

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
