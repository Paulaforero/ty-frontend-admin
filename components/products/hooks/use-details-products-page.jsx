'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useProductDetailsPage() {
  const router = useRouter()
  const notify = useSnackbar()

  const searchParams = useSearchParams()

  const id = searchParams.get('id')

  const [productData, setProductData] = useState({
    name: '',
    description : '',
    isEcologic : '',
    supplyLineId : '',
  })

  const [isLoading, setIsLoading] = useState(true)

  const rows = useMemo(
    () => [
      {
        label: 'Nombre',
        value: productData.name,
      },
      {
        label: 'Descripción',
        value: productData.description
      },
      {
        label: 'Es ecológico',
        value: productData.isEcologic,
      },
      {
        label: 'Linea de suministro (ID)',
        value: productData.supplyLineId,
      },
    ],
    [productData]
  )

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URLS.products}?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      })

      if (!response.ok) throw new Error()

      notify({
        message: '¡El producto se ha eliminado exitósamente!',
        severity: 'success',
      })

      router.push('/products')
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el producto.',
        severity: 'error',
      })
    }
  }

  const fetchProductData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URLS.products}/view?id=${id}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      const responseData = await response.json()
      const fetchedProductData = responseData.data
      fetchedProductData.isEcologic ? fetchedProductData.isEcologic = 'Si': fetchedProductData.isEcologic = 'No'
      setProductData(fetchedProductData)
    } catch (error) {
      notify({
        message: 'Error obteniendo los datos del producto.',
        severity: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [notify, id])

  useEffect(() => {
    fetchProductData()
  }, [fetchProductData])

  return {
    rows,
    productData,
    handleDelete,
    isLoading,
    id,
  }
}
