'use client'

import { useState, useCallback,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useProductCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    isEcologic: '',
    supplyLineId: '',
  })
  const [supplyLines, setSupplyLines]= useState([])
  
  const fetchSupplyLine = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.supplyLines, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedSupplyLine= responseData.data

      setSupplyLines(fetchedSupplyLine)
    } catch (error) {
      notify({
        message: 'Error obteniendo las lineas de suministro',
        severity: 'error',
      })
    }
  }, [notify])

  const createProduct = async () => {
    try {
      const response = await fetch(BACKEND_URLS.products, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/products')

      notify({
        message: '¡Producto creada con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el producto...',
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
        type: 'select',
        options: supplyLines.map(supplyLines => ({
          label: supplyLines.name,
          value: supplyLines.id,
        })),
      name: 'supplyLineId',
      label: 'Linea de suministro (ID)',
      required: true,
    },

    {
        label: 'Descripción',
        type: 'text',
        name: 'description',
        required: true,
      },
      {
      type: 'select',
      options: [
        {
          label: 'Verdadero',
          value: true,
        },
        {
          label: 'Falso',
          value: false,
        },
      ],
      name: 'isEcologic',
      label: 'Es ecológico',
      required: true,
    }
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createProduct()
  }
  useEffect(() => {
    fetchSupplyLine()
  }, [fetchSupplyLine])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
