'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useDiscountCreationPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const [formValues, setFormValues] = useState({
    dealershipRif: '',
    discountPercentage: '',
    requiredAnnualServiceUsageCount: '',  
  })

  const [dealerships, setDealerships] = useState([])

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
  }, [notify])

  const createDiscount = async () => {
    try {
      const response = await fetch(BACKEND_URLS.discounts, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      router.push('/discounts')

      notify({
        message: '¡Descuento creado con éxito!',
        severity: 'success',
      })
    } catch (error) {
      notify({
        message: 'Error al crear el descuento...',
        severity: 'error',
      })
    }
  }

  const inputs = [
    {
      label: 'Porcentaje de descuento',
      type: 'number',
      name: 'discountPercentage',
      adornment: '%',
      required: true,
      min: 0,
      max: 1,
    },
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
        label: 'Cantidad de servicios requeridos',
        type: 'number',
        name: 'requiredAnnualServiceUsageCount',
        required: true,
        min: 0
      },
  ]

  const handleChange = event => {
    const { name, value } = event.target
    let parsedValue = value

    if (name === 'requiredAnnualServiceUsageCount') parsedValue = parseInt(value)
    if (name === 'discountPercentage') parsedValue = parseFloat(value)

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createDiscount()
  }

  useEffect(() => {
    fetchDealerships()
  }, [fetchDealerships])

  return {
    inputs,
    formValues,
    handleChange,
    handleSubmit,
  }
}