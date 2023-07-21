'use client'
import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useProductsDataPage() {
  const notify = useSnackbar()

  const [products, setProducts] = useState([])

  const columns = {
    id: 'ID',
    name: 'Nombre',
    isEcologic: 'Es ecológico',
    supplyLineId: 'Linea suministro (ID)' 
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'id': row.id },
        isEcologic: row.isEcologic ? 'Si': 'No',
      }
    })

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.products, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedProducts = responseData.data
      const formattedProducts = addIdAttrsObjectToEachRow(fetchedProducts)

      console.log(formattedProducts);

      setProducts(formattedProducts)
    } catch (error) {
      notify({
        message: 'Error obteniendo los productos.',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'id': id,
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.products}?id=${id}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado el producto exitosamente!',
        severity: 'success',
      })

      fetchProducts()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar el producto.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, columns, handleDelete }
}

