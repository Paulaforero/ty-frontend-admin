'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useRoleEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(true)

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

  const fetchRoleData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.roles}/view?id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedRoleData = responseData.data

      setFormValues(fetchedRoleData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del cargo.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])

  useEffect(() => {
    fetchRoleData()
  }, [fetchRoleData])

  const editRole = async () => {
    try {
      const { id, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.roles}?id=${id}`,
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
        message: '¡Se ha editado el cargo exitosamente!',
        severity: 'success',
      })

      router.push('/roles')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el cargo.',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editRole()
  }

  useEffect(() => {
    fetchRoleData()
  }, [fetchRoleData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id}
}
