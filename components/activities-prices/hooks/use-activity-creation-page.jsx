'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useActivityPriceCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    activityNumber: '',
    serviceId: '',
    dealershipRif: '',
    pricePerHour: '',
  })

  const [services, setServices] = useState([])
  const [activities, setActivities] = useState([])
  const [dealerships, setDealerships] = useState([])

  const fetchServices = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.services}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedDealershipData = responseData.data

      setServices(fetchedDealershipData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de los servicios',
        severity: 'error',
      })
    }
  }, [notify])

  const fetchDealerships = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.dealerships}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedDealershipData = responseData.data

      setDealerships(fetchedDealershipData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de los concesionarios.',
        severity: 'error',
      })
    }
  }, [notify, dealershipRif])

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.activities}`, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedActivityData = responseData.data

      setActivities(fetchedActivityData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de las actividades.',
        severity: 'error',
      })
    }
  }, [notify])

  const createActivityPrice = async () => {
    try {
      const response = await fetch(BACKEND_URLS.activitiesPrices, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/activities-prices')

      notify({
        message: '¡Costo de la actividad creada con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el costo de la actividad...',
        severity: 'error',
      })
    }
  }

  const inputs = [
    {
      label: 'Concesionario',
      type: 'select',
      options: dealerships.map(dealership => ({
        label: dealership.name,
        value: dealership.rif,
      })),
      name: 'dealershipRif',
      required: true,
    },
    {
      label: 'Servicio',
      type: 'select',
      options: services.map(service => ({
        label: service.name,
        value: service.id,
      })),
      name: 'dealershipRif',
      required: true,
    },
    {
      label: 'Actividad',
      type: 'select',
      options: activities
        .filter(activity => activity.serviceId === formValues.serviceId)
        .map(activity => ({
          label: activity.description,
          value: activity.activityNumber,
        })),
      name: 'dealershipRif',
      required: true,
    },
    {
      label: 'Precio de la actividad',
      type: 'number',
      min: 0,
      adornment: '$',
      name: 'pricePerHour',
      required: true,
    },
  ]

  const handleChange = event => {
    const { name, value } = event.target
    let parsedValue = value

    if (name === 'pricePerHour') parsedValue = parseFloat(value)

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createActivityPrice()
  }

  useEffect(() => {
    fetchDealerships()
    fetchServices()
    fetchActivities()
  }, [fetchServices, fetchDealerships, fetchActivities])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}
