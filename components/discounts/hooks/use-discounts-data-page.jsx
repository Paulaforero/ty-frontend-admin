'use client'
import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useDiscountsDataPage() {
  const notify = useSnackbar()

  const [discounts, setDiscounts] = useState([])

  const columns = {
    discountNumber  : 'ID',
    dealershipRif : 'Concesionario (RIF)',
    discountPercentage : '% de descuento',
    requiredAnnualServiceUsageCount : 'Cantidad de servicios'
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'discount-number': row.discountNumber, 'dealership-rif': row.dealershipRif },
      }
    })

  const fetchDiscounts = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.discounts, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedDiscounts = responseData.data
      const formattedDiscounts = addIdAttrsObjectToEachRow(fetchedDiscounts)

      setDiscounts(formattedDiscounts)

    } catch (error) {
      notify({
        message: 'Error obteniendo los descuentos.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'discount-number': discountNumber,
    'dealership-rif': dealershipRif,
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.discounts}?discount-number=${discountNumber}&dealership-rif=${dealershipRif}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el descuento exitosamente!',
        severity: 'success',
      })

      fetchDiscounts()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el descuentos.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchDiscounts()
  }, [fetchDiscounts])

  return { discounts, columns, handleDelete }
}

