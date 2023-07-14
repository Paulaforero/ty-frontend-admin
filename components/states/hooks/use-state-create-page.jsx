'use client'

import { useState } from 'react'
import useSnackbar from '@/hooks/use-snackbar'

export default function useStateCreationPage() {
  

  const [formValues, setFormValues] = useState({
    name: '',
  })

  const inputs = [
    {
        label: 'Nombre',
        type: 'text',
        name: 'name',
        required: true,
      },
      
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }


  return {
    inputs,
    formValues,
    handleChange,
  }
}

