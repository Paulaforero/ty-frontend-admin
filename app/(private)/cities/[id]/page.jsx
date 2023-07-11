'use client'

import DetailsPageView from '@/components/details-page-view'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Typography } from '@mui/material'
import { BACKEND_URLS } from '@/utils/backend-urls'

export default function ViewPage() {
  const router = useRouter()

  const { id } = useParams()

  const [cityData, setCityData] = useState({
    id: '',
    name: 'aaa',
    stateId: '',
  })
  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'ID:',
        value: cityData.id,
      },
      {
        label: 'Nombre:',
        value: cityData.name,
      },
      {
        label: 'Estado:',
        value: cityData.stateId,
      },
    ],
    [cityData]
  )

  const handleChange = event => {
    setCityData({ ...cityData, [event.target.name]: event.target.value })
  }

  const editCity = async () => {
    try {
      const response = await fetch(BACKEND_URLS.cities, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cityData),
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.cities}/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/cities')
    } catch (error) {
      console.log(error)
      alert('ERROR')
    }
  }

  const fetchCityData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URLS.cities}/${id}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const fetchedCityData = await response.json()

      setCityData(fetchedCityData)
    } catch (error) {
      alert('ERROR')
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchCityData()
  }, [fetchCityData])

  return (
    <>
      {!isLoading ? (
        <DetailsPageView
          title={`Ciudad #${id}`}
          toEditButtonLabel="Editar Ciudad"
          rows={rows}
          values={cityData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      ) : (
        <Typography align="center">Loading...</Typography>
      )}
    </>
  )
}
