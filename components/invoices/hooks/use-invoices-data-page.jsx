'use client'
import { useState, useCallback, useEffect } from 'react'
import { BACKEND_URLS } from '@/utils/backend-urls'
import useSnackbar from '@/hooks/use-snackbar'

export default function useInvoicesDataPage() {
  const notify = useSnackbar()

  const [invoices, setInvoices] = useState([])

  const columns = {
    id: 'ID',
    orderId : 'Orden (ID)',
    amountDue : 'Monto adeudado',
    discount :'Descuento',
    issueDate :'Fecha',
  }

  const addIdAttrsObjectToEachRow = rows =>
    rows.map(row => {
      return {
        ...row,
        idAttrs: { 'id': row.id,},
      }
    })

  const fetchInvoices = useCallback(async () => {
    try {
      const response = await fetch(BACKEND_URLS.invoices, {
        method: 'GET',
        cache: 'no-store',
      })

      const responseData = await response.json()
      const fetchedInvoices = responseData.data
      const formattedInvoices = addIdAttrsObjectToEachRow(fetchedInvoices)

      setInvoices(formattedInvoices)
    } catch (error) {
      notify({
        message: 'Error obteniendo las facturas',
        severity: 'error',
      })
    }
  }, [notify])

  const handleDelete = async ({
    'id': id,
  }) => {
    try {
      const response = await fetch(
        `${BACKEND_URLS.invoices}?id=${id}`,
        {
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) throw new Error()

      notify({
        message: '¡Se ha eliminado la factura exitosamente!',
        severity: 'success',
      })

      fetchInvoices()
    } catch (error) {
      notify({
        message: 'Error al intentar eliminar la factura.',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  return { invoices, columns, handleDelete }
}

