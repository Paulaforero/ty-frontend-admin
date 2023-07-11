'use client'

import EditionPageView from '@/components/edition-page-view'
import { useCallback, useEffect, useState } from 'react'
import { states } from '@/mock/cities'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function useCitiesEditionPage() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [formValues, setFormValues] = useState({
    id,
    name: '',
    stateId: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const inputs = [
    {
      label: 'Nombre:',
      type: 'text',
      name: 'name',
      placeholder: 'Ingrese el nombre',
      required: true,
    },
    {
      label: 'Estado:',
      type: 'select',
      options: states.map(state => ({
        label: state.name,
        value: state.id,
      })),
      name: 'stateId',
      placeholder: 'Seleccione el estado',
      required: true,
    },
  ]

  const handleChange = event => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const fetchCityData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URLS.cities}/${id}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const fetchedCityData = await response.json()

      setFormValues(fetchedCityData)
    } catch (error) {
      alert('ERROR')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  const editCity = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.cities}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/cities')
    } catch (error) {
      console.log(error)
      alert('ERROR')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editCity()
  }

  useEffect(() => {
    fetchCityData()
  }, [fetchCityData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading }
}
