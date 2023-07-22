'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useDiscountDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const discountNumber = searchParams.get('discount-number')
  const dealershipRif = searchParams.get('dealership-rif')
  const id = discountNumber + '/' + dealershipRif

  const [discountData, setDiscountData] = useState({
    discountPercentage: '',
    requiredAnnualServiceUsageCount: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'Porcentaje de descuento',
        value: discountData.discountPercentage,
      },
      {
        label: 'Nombre:',
        value: discountData.requiredAnnualServiceUsageCount,
      },
    ],
    [discountData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.discounts}?discount-number=${discountNumber}&dealership-rif=${dealershipRif}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El descuento se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/discounts')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el descuento.',
        severity: 'error',
      })
    }
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
      setDiscountData(fetchedDiscountData)

    } catch (error) {
      notify({
        message: 'Error obteniendo los datos de la ciudad.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, discountNumber, dealershipRif])

  useEffect(() => {
    fetchDiscountData()
  }, [fetchDiscountData])

  return {
    rows,
    discountData,
    handleDelete,
    isLoading,
    id,
  }
}
