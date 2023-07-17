'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useSupplyLineEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [formValues, setFormValues] = useState({
    name: '',
  })

  const [isLoading, setIsLoading] = useState(true)

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

  const fetchSupplyLineData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.supplyLines}/view?id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedSupplyLineData = responseData.data

      setFormValues(fetchedSupplyLineData)
    } catch (error) {
      notify({
        message: 'Error al obtener los datos de la línea de suministro.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [id, notify])

  const editSupplyLine = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.supplyLines}/view?id=${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha editado la línea de suministro exitosamente!',
        severity: 'success',
      })

      router.push('/supplyLines')
    } catch (error) {
      notify({
        message: 'Error al intentar editar la línea de suministro.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editSupplyLine()
  }

  useEffect(() => {
    fetchSupplyLineData()
  }, [fetchSupplyLineData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading }
}
