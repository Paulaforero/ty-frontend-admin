'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import { useRouter } from 'next/navigation'
import useSnackbar from '@/hooks/use-snackbar'

export default function useDiscountEditionPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const discountNumber = searchParams.get('discount-number')
  const dealershipRif = searchParams.get('dealership-rif')
  const id = discountNumber + '/' + dealershipRif

  const [formValues, setFormValues] = useState({
    discountPercentage: '',
    requiredAnnualServiceUsageCount: '',
  })

  const [isLoading, setIsLoading] = useState(true)

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
        label: 'Cantidad de servicios requeridos',
        type: 'number',
        name: 'requiredAnnualServiceUsageCount',
        required: true,
        min: 0
      },
  ]

  const handleChange = event => {
    const { name, value } = event.target
    let parsedValue

    if (name === 'requiredAnnualServiceUsageCount') parsedValue = parseInt(value)
    if (name === 'discountPercentage') parsedValue = parseFloat(value)

    setFormValues({
      ...formValues,
      [name]: parsedValue,
    })
  }

  const fetchDiscountData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.discounts}/view?discount-number=${discountNumber}&dealership-rif=${dealershipRif}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedDiscountData = responseData.data

      setFormValues(fetchedDiscountData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del descuento.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, discountNumber, dealershipRif])

  const editDiscount = async () => {
    try {
      const { discountNumber, ...toEditValues } = formValues
      const response = await fetch(
        `${BACKEND_URLS.discounts}?discount-number=${discountNumber}&dealership-rif=${dealershipRif}`,
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
        message: '¡Se ha editado el descuento exitosamente!',
        severity: 'success',
      })

      router.push('/discounts')
    } catch (error) {
      notify({
        message: 'Error al intentar editar el descuento',
        severity: 'error',
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    editDiscount()
  }

  useEffect(() => {
    fetchDiscountData()
  }, [fetchDiscountData])

  return { inputs, formValues, handleChange, handleSubmit, isLoading, id,
  }
}
